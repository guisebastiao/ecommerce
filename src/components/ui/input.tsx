import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-zinc-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus:border-foreground focus:placeholder:sr-only border-input flex h-9 w-full min-w-0 border-b-2 bg-transparent px-3 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all",
        "aria-invalid:border-b-destructive aria-invalid:text-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
