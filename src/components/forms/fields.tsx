import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-md border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-gray-mid focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

export function FieldWrapper({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-heading text-sm font-medium uppercase tracking-wide text-gray-light">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-1 block text-sm text-red-400">{error}</span> : null}
    </label>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(baseField, className)} {...props} />;
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea ref={ref} className={cn(baseField, "min-h-28", className)} {...props} />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(baseField, className)} {...props}>
      {children}
    </select>
  );
});
