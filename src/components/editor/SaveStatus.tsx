import { Check, Loader2 } from "lucide-react";

interface Props {
  saved: boolean;
}

export const SaveStatus = ({ saved }: Props) => {
  return (
    <span
      className="flex items-center gap-1.5 text-sm text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      {saved ? (
        <>
          <Check size={14} className="text-emerald-600" />
          <span className="hidden sm:inline">Saved</span>
        </>
      ) : (
        <>
          <Loader2 size={14} className="animate-spin" />
          <span className="hidden sm:inline">Saving...</span>
        </>
      )}
    </span>
  );
};