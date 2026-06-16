
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface DashboardHeaderProps {
  onCreateDocument: () => void;
}

export const DashboardHeader = ({
  onCreateDocument,
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Documents
        </h1>

        <p className="text-muted-foreground">
          Manage and collaborate on documents
        </p>
      </div>

      <Button onClick={onCreateDocument}>
        <Plus className="mr-2 h-4 w-4" />
        New Document
      </Button>
    </div>
  );
};