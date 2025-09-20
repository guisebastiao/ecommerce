import { forwardRef, type InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";
import { twMerge } from "tailwind-merge";

interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number | string;
  onChange?: (value: number) => void;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(({ className, value, onChange, ...props }, ref) => {
  return (
    <IMaskInput
      {...(props as any)}
      mask="R$ num"
      blocks={{
        num: {
          mask: Number,
          scale: 2,
          thousandsSeparator: ".",
          padFractionalZeros: true,
          radix: ",",
          mapToRadix: ["."],
          min: 0,
          max: 9999999999,
        },
      }}
      inputRef={ref}
      value={value}
      onAccept={(val: number) => {
        onChange?.(val);
      }}
      className={twMerge(
        "file:text-foreground placeholder:text-zinc-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus:border-foreground border-input flex h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        "aria-invalid:border-b-destructive aria-invalid:text-destructive",
        className
      )}
    />
  );
});

CurrencyInput.displayName = "CurrencyInput";
