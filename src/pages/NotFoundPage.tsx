import { useNavigate } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "../components/ui/button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <FileQuestion className="h-8 w-8 text-muted-foreground" />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button onClick={() => navigate("/")}>Back to documents</Button>
    </div>
  );
};