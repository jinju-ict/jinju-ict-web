#!/usr/bin/env bash
#
# 진주 정보통신 사이트 — 보안 룰 자가 검증 (CLAUDE.md §5)
#
# 사이트 빌드 산출물(src/, public/)에 다음 금지 단어가 포함되면 fail:
#   - 골든플래닛           : gp_claw 의 실제 클라이언트 회사명
#   - Geoffrey / Huntley   : 사내 자율 개발 하네스 OSS 원작자명
#   - Ralph Wiggum         : 자율 개발 하네스 OSS 원본명
#   - superpowers          : 개발 안전 워크플로우 OSS 원본명
#   - Nexora / Nexora Labs : Nova 디자인 레퍼런스의 가공 회사명 (혼입 방지)
#
# specs/ 는 ralph 내부 메모라 빌드에 포함되지 않으므로 검사 대상에서 제외.

set -e

FORBIDDEN_PATTERN='(골든플래닛|Geoffrey|Huntley|Ralph Wiggum|superpowers|Nexora)'
SEARCH_DIRS="src public"

# grep 가 매치를 발견하면 0 exit -> we treat that as failure.
if grep -r -i -n -E "$FORBIDDEN_PATTERN" $SEARCH_DIRS 2>/dev/null; then
  echo ""
  echo "❌ Forbidden word found in site sources. CLAUDE.md §5 보안 룰 위반."
  echo "   해당 라인을 추상화해서 다시 작성하십시오."
  exit 1
fi

echo "✓ Security check passed — 0 forbidden words in src/ + public/."
exit 0
