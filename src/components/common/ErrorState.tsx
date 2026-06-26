import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
      <AlertCircle className="h-5 w-5 text-destructive" />
      <p className="text-sm text-destructive">{message}</p>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="mr-2 h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  );
};