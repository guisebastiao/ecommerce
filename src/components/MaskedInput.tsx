import { IMaskInput, type IMaskInputProps } from "react-imask";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

export type MaskedInputProps = IMaskInputProps<HTMLInputElement> & {
  className?: string;
  unmask?: "typed" | "raw" | boolean;
};

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(({ className, onChange, ...props }, ref) => {
  return (
    <IMaskInput
      {...props}
      inputRef={ref}
      onAccept={(_value, maskRef) => {
        onChange?.({
          target: {
            name: (props as any).name,
            value: maskRef.unmaskedValue || maskRef.value,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>);
      }}
      className={twMerge(
        "file:text-foreground placeholder:text-zinc-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus:border-foreground border-input flex h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-sm outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        "aria-invalid:border-b-destructive aria-invalid:text-destructive",
        className
      )}
    />
  );
});

MaskedInput.displayName = "MaskedInput";
