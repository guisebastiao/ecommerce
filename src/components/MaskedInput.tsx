import { forwardRef, type InputHTMLAttributes } from "react";
import { IMaskInput, type IMaskInputProps } from "react-imask";
import { twMerge } from "tailwind-merge";

export interface MaskedInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "mask"> {
  mask: string;
}

export const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(({ mask, className, onChange, ...props }, ref) => {
  return (
    <IMaskInput
      {...(props as IMaskInputProps<HTMLInputElement>)}
      mask={mask as any}
      inputRef={ref}
      onAccept={(_value, maskRef) => {
        onChange?.({
          target: {
            name: (props as any).name,
            value: maskRef.unmaskedValue,
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
