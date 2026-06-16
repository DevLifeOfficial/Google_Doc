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
        title="No Documents Yet"
        description="Create your first document or import a file to get started."
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
        />
      ))}
    </div>
  );
};