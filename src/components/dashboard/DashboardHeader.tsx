import { Plus, Upload, FileText } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  onCreateDocument: () => void;
  onUpload: () => void;
}

export const DashboardHeader = ({
  onCreateDocument,
  onUpload,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="rounded-lg border bg-muted p-3">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Documents
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create, edit and collaborate on documents with your team.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onUpload}
        >
          <Upload className="mr-2 h-4 w-4" />
          Import File
        </Button>

        <Button onClick={onCreateDocument}>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>
    </div>
  );
};