import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const [isType, setType] = React.useState(type);

  const handleVisible = () => {
    setType(isType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full relative">
      <input
        type={isType}
        data-slot="input"
        className={cn(
          "file:sr-only placeholder:text-zinc-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 focus:border-foreground border-input flex h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-sm outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          "aria-invalid:border-b-destructive aria-invalid:text-destructive",
          className,
          type === "password" && "pr-9"
        )}
        {...props}
      />
      {type === "password" && (
        <button type="button" className="absolute top-0 right-0 size-9 flex items-center justify-center cursor-pointer" onClick={handleVisible}>
          {isType !== "password" ? <Eye className="size-4.5" /> : <EyeOff className="size-4.5" />}
        </button>
      )}
    </div>
  );
}

export { Input };
