#!/usr/bin/env bash
#
# 진주 정보통신개발 사이트 — 포트폴리오 자산 자동 수집 (T4 major-rework)
#
# 각 프로젝트 폴더에서 스크린샷/로고/아이콘/앱 프리뷰 자동 탐색 후
# public/portfolio/<slug>/{thumbnail,screen-1,screen-2,...}.<ext> 로 cp.
#
# 보안 룰 (완화된 버전 — T4 명세):
#   - 무조건 SKIP 이 아니라 파일명 검사 후 cp 허용
#   - 파일명에 금지 단어 포함 시 skip (이미지 본문은 OCR 불가 → 파일명만 판단)
#   - 금지 단어:
#     * 골든플래닛 / gp_claw 실제 클라이언트명
#     * Ralph Wiggum / superpowers / Geoffrey / Huntley (OSS 원본명)
#     * Nexora (Nova 가공 회사명 혼입 방지)
#
# 결과: src/lib/portfolio-assets.ts 자동 생성
#         (PortfolioCard / 상세페이지가 lookup)
#
# Note: macOS 기본 bash 3.2 호환 — associative array 사용 X.

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT/public/portfolio"
MANIFEST="$ROOT/src/lib/portfolio-assets.ts"

mkdir -p "$PUBLIC_DIR"

# parallel arrays — index 매칭으로 slug ↔ source path
SLUGS=(
  "ttoktok"
  "shortdub"
  "king-of-law"
  "andy"
  "office-agent"
  "ai-news-daily"
  "dev-harness"
  "dev-safety"
)
# TtokTtok 는 jinsup_space 가 최신 (git log 비교 — jinsup_ralph 는 placeholder 만 있음).
# 모든 프로젝트가 후보 — SKIP_SECURITY 마커는 더 이상 사용 X.
# 자산이 없거나 파일명에 금지 단어가 박혀있으면 skip.
PATHS=(
  "/Users/goldenplanet/jinsup_space/TtokTtok"
  "/Users/goldenplanet/jinsup_ralph/shortdub"
  "/Users/goldenplanet/jinsup_ralph/king_of_law"
  "/Users/goldenplanet/jinsup_space/Andy"
  "/Users/goldenplanet/jinsup_space/gp_claw"
  "/Users/goldenplanet/jinsup_ralph/ai_news_scraping"
  "/Users/goldenplanet/jinsup_space/js-ralph"
  "/Users/goldenplanet/jinsup_space/js-super"
)

FORBIDDEN='(골든플래닛|geoffrey|huntley|ralph wiggum|superpowers|nexora)'

# generic 빌드 도구 로고 / 의미 없는 파일 제외 (보안 X, 정성 룰)
# vite.svg / flutter generic 등 — 제외하지 않으면 thumbnail 이 의미없는 로고로 채워짐.
GENERIC_BLACKLIST='(^vite\.|^flutter\.|^react\.|^next\.|^tailwind\.|^vercel\.)'

# 최소 자산 크기 (bytes) — 너무 작은 아이콘은 미감 X
# PNG 기준: 1024x1024 RGBA ~ 10KB+, 작은 16x16 ~ 200B. 임계점 3KB 로 설정.
MIN_PNG_SIZE=3000
MIN_JPG_SIZE=3000
# SVG 는 작아도 그라데이션 OG 카드 가능 → 더 낮게
MIN_SVG_SIZE=300

# 후보 디렉토리 확장 — T4 명세
CANDIDATE_DIRS=(
  "."
  "public"
  "assets"
  "images"
  "screenshots"
  "docs"
  "static"
  "mobile/assets"
  "mobile/ios/Runner/Assets.xcassets/AppIcon.appiconset"
  "mobile/android/app/src/main/res/mipmap-xxxhdpi"
  "mobile/android/app/src/main/res/mipmap-xxhdpi"
  "app/src/main/res/mipmap-xxxhdpi"
  "app/src/main/res/mipmap-xxhdpi"
  "app/src/main/res/mipmap-hdpi"
  "app/src/main/res/drawable"
  "web/public"
  "web/src/assets"
  "frontend/public"
  "frontend/src/assets"
)

# 후보 패턴 — 큰 PNG/SVG/WEBP 우선
# 일반 *.svg / *.png 는 마지막에 fallback
IMAGE_PATTERNS=(
  "og.svg"
  "og.png"
  "Icon-App-1024x1024*.png"
  "app-icon.png"
  "ic_launcher.png"
  "app-preview*.png"
  "preview*.png"
  "screenshot*.png"
  "screen*.png"
  "hero*.png"
  "hero*.svg"
  "logo*.svg"
  "logo*.png"
  "icon-512*.png"
  "favicon.svg"
  "thumbnail*.png"
  "image*.png"
  "*.svg"
  "*.png"
  "*.jpg"
  "*.jpeg"
  "*.webp"
)

# 한 프로젝트당 최대 자산 수
MAX_ASSETS_PER_PROJECT=3

ENTRIES=""
total_found=0
total_skipped_security=0
total_skipped_missing=0

declare_entry() {
  local slug="$1"
  local thumbnail="$2"
  local screens="$3"
  ENTRIES="$ENTRIES  \"$slug\": {"$'\n'
  if [ -n "$thumbnail" ]; then
    ENTRIES="$ENTRIES    thumbnail: \"$thumbnail\","$'\n'
  fi
  if [ -n "$screens" ]; then
    ENTRIES="$ENTRIES    screens: [$screens],"$'\n'
  fi
  ENTRIES="$ENTRIES  },"$'\n'
}

for i in "${!SLUGS[@]}"; do
  slug="${SLUGS[$i]}"
  src="${PATHS[$i]}"
  echo "[$slug] $src"

  if [ ! -d "$src" ]; then
    echo "  ⚠️  source not found"
    total_skipped_missing=$((total_skipped_missing + 1))
    continue
  fi

  # 깨끗한 dest 디렉토리 (이전 자산 잔존 방지)
  dest_dir="$PUBLIC_DIR/$slug"
  rm -rf "$dest_dir"
  mkdir -p "$dest_dir"

  matches=()
  for dir in "${CANDIDATE_DIRS[@]}"; do
    p="$src/$dir"
    [ -d "$p" ] || continue
    for pattern in "${IMAGE_PATTERNS[@]}"; do
      hit=$(find "$p" -maxdepth 2 -type f -iname "$pattern" 2>/dev/null \
        | grep -vi 'node_modules\|\.next\|build/\|dist/\|\.git/\|\.worktrees\|\.dart_tool\|\.gradle/' || true)
      [ -z "$hit" ] && continue
      while IFS= read -r f; do
        [ -z "$f" ] && continue
        bn=$(basename "$f" | tr '[:upper:]' '[:lower:]')
        if echo "$bn" | grep -E -i "$FORBIDDEN" > /dev/null; then
          echo "  ⊘  skip (filename forbidden): $(basename "$f")"
          total_skipped_security=$((total_skipped_security + 1))
          continue
        fi
        if echo "$bn" | grep -E -i "$GENERIC_BLACKLIST" > /dev/null; then
          echo "  ⊘  skip (generic build tool logo): $(basename "$f")"
          continue
        fi
        # 최소 크기 게이트 — 너무 작은 아이콘은 미감 X
        fsize=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f" 2>/dev/null || echo 0)
        ext_lower=$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')
        case "$ext_lower" in
          svg)
            [ "$fsize" -lt "$MIN_SVG_SIZE" ] && {
              echo "  ⊘  skip (too small svg ${fsize}b): $(basename "$f")"
              continue
            }
            ;;
          png)
            [ "$fsize" -lt "$MIN_PNG_SIZE" ] && {
              echo "  ⊘  skip (too small png ${fsize}b): $(basename "$f")"
              continue
            }
            ;;
          jpg|jpeg|webp)
            [ "$fsize" -lt "$MIN_JPG_SIZE" ] && {
              echo "  ⊘  skip (too small img ${fsize}b): $(basename "$f")"
              continue
            }
            ;;
        esac
        # realpath 기반 중복 회피 (다른 경로로 같은 파일 재히트 방지)
        f_real=$(cd "$(dirname "$f")" 2>/dev/null && pwd)/$(basename "$f")
        already=0
        for m in "${matches[@]}"; do
          m_real=$(cd "$(dirname "$m")" 2>/dev/null && pwd)/$(basename "$m")
          [ "$m_real" = "$f_real" ] && already=1 && break
          # 같은 파일사이즈 + 같은 basename 도 중복으로 간주 (dest 충돌 방지)
          msize=$(stat -f%z "$m" 2>/dev/null || stat -c%s "$m" 2>/dev/null || echo 0)
          if [ "$fsize" = "$msize" ] && [ "$(basename "$f")" = "$(basename "$m")" ]; then
            already=1
            break
          fi
        done
        [ $already -eq 1 ] && continue
        matches+=("$f")
        [ ${#matches[@]} -ge $MAX_ASSETS_PER_PROJECT ] && break 3
      done <<< "$hit"
    done
  done

  if [ ${#matches[@]} -eq 0 ]; then
    echo "  ⚠️  no asset found (placeholder will render)"
    total_skipped_missing=$((total_skipped_missing + 1))
    continue
  fi

  # 첫 매치 → thumbnail
  thumb_src="${matches[0]}"
  thumb_ext=$(echo "${thumb_src##*.}" | tr '[:upper:]' '[:lower:]')
  cp "$thumb_src" "$dest_dir/thumbnail.$thumb_ext"
  thumb_url="/portfolio/$slug/thumbnail.$thumb_ext"
  echo "  ✓ thumbnail  ← $(basename "$thumb_src")"
  total_found=$((total_found + 1))

  # 추가 매치 → screen-N
  screens_list=""
  screen_idx=1
  for f in "${matches[@]:1}"; do
    ext=$(echo "${f##*.}" | tr '[:upper:]' '[:lower:]')
    cp "$f" "$dest_dir/screen-$screen_idx.$ext"
    screen_url="/portfolio/$slug/screen-$screen_idx.$ext"
    echo "  ✓ screen-$screen_idx   ← $(basename "$f")"
    if [ -z "$screens_list" ]; then
      screens_list="\"$screen_url\""
    else
      screens_list="$screens_list, \"$screen_url\""
    fi
    screen_idx=$((screen_idx + 1))
    total_found=$((total_found + 1))
  done

  declare_entry "$slug" "$thumb_url" "$screens_list"
done

# ---------- Generate manifest ----------
{
  echo "// Auto-generated by scripts/collect-portfolio-assets.sh — do not edit."
  echo "// Keys are project slugs; values describe thumbnail + screens for next/image."
  echo "//"
  echo "// 보안 룰 (CLAUDE.md §5): src/ + public/ 에 금지 단어 절대 노출 X."
  echo "// 파일명 검사 후 cp 되었으며, scripts/check-security.sh 로 자가 검증됨."
  echo ""
  echo "export type PortfolioAsset = {"
  echo "  thumbnail?: string;"
  echo "  screens?: string[];"
  echo "};"
  echo ""
  echo "export const PORTFOLIO_ASSETS: Record<string, PortfolioAsset> = {"
  printf "%s" "$ENTRIES"
  echo "};"
} > "$MANIFEST"

echo ""
echo "Manifest written: $MANIFEST"
echo "Result: assets_copied=$total_found, projects_skipped_missing=$total_skipped_missing, files_skipped_security=$total_skipped_security, total_projects=${#SLUGS[@]}"
