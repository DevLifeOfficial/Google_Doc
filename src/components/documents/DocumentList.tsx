import type { Document } from "../../types";
import { DocumentCard } from "./DocumentCard";
import { EmptyState } from "./EmptyState";

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList = ({
  documents,
}: DocumentListProps) => {
  if (!documents.length) {
    return (
      <EmptyState
        title="No Documents"
        description="Create your first document."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  );
};