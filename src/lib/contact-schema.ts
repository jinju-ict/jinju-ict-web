import { z } from "zod";

/**
 * 협업·문의 폼 검증 스키마.
 *
 * Zod 4 + react-hook-form 7 호환.
 * 서버 라우트(`app/api/contact/route.ts`)와 클라이언트 폼이 모두 이 스키마를 공유.
 */

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요.")
    .max(50, "이름은 50자 이내로 입력해 주세요."),
  company: z
    .string()
    .trim()
    .max(80, "회사명은 80자 이내로 입력해 주세요.")
    .optional()
    .or(z.literal("")),
  contact: z
    .string()
    .trim()
    .min(1, "연락 가능한 이메일 또는 전화를 입력해 주세요.")
    .max(120, "연락처는 120자 이내로 입력해 주세요."),
  message: z
    .string()
    .trim()
    .min(10, "문의 내용을 10자 이상 입력해 주세요.")
    .max(2000, "문의 내용은 2000자 이내로 입력해 주세요."),
  /**
   * Honeypot — 사람에게는 안 보이는 hidden 필드.
   * 봇은 form 의 모든 필드를 채우는 경향이라 이 필드에 값이 들어오면 차단.
   * 검증 메시지는 UI 에 노출 X (hidden 이므로).
   */
  website: z
    .string()
    .optional()
    .refine((v) => !v || v.length === 0, { message: "BOT_DETECTED" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
