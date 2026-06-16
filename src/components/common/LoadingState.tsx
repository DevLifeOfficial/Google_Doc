import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-64 rounded-md bg-muted" />

      <div className="h-12 w-full rounded-md bg-muted" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-3/4 rounded bg-muted" />
      </div>
    </div>
  );
};