"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-primary">
            *
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      contact: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? `서버 응답 ${res.status}`);
      }
      toast.success(
        "문의가 접수되었습니다. 빠른 시일 안에 회신드리겠습니다.",
      );
      reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      toast.error(`전송 실패 — ${msg}. 잠시 후 다시 시도해 주세요.`);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Honeypot — hidden from humans */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website (do not fill)</Label>
        <Input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="이름"
          htmlFor="name"
          error={errors.name?.message}
          required
        >
          <Input id="name" placeholder="홍길동" {...register("name")} />
        </Field>
        <Field
          label="회사 (선택)"
          htmlFor="company"
          error={errors.company?.message}
        >
          <Input
            id="company"
            placeholder="진주 ICT"
            {...register("company")}
          />
        </Field>
      </div>

      <Field
        label="연락처"
        htmlFor="contact"
        error={errors.contact?.message}
        hint="회신 가능한 이메일 또는 전화번호"
        required
      >
        <Input
          id="contact"
          placeholder="email@example.com"
          {...register("contact")}
        />
      </Field>

      <Field
        label="문의 내용"
        htmlFor="message"
        error={errors.message?.message}
        hint="프로젝트 개요, 일정, 예산 범위 등 자유롭게 적어 주세요."
        required
      >
        <Textarea
          id="message"
          rows={7}
          placeholder="안녕하세요, ..."
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          전송 시 dlwlstjq410@gmail.com 으로 접수됩니다.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="h-12 rounded-full px-6 text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              전송 중...
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              문의 보내기
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
