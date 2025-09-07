import { twMerge } from "tailwind-merge";

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={twMerge("animate-spin inline-block size-6 border-3 border-transparent border-t-transparent text-foreground rounded-full", className)} role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
};
