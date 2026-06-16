import { useEffect, useState } from "react";

import { documentService } from "../services";
import type { Document } from "../types";

import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardSection } from "../components/dashboard/DashboardSection";
import { DocumentList } from "../components/documents/DocumentList";
import { actual_current_user } from "../constants/current-user";

export const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const loadDocuments = async () => {
    const data =
      await documentService.getAll();

    setDocuments(data);
  };

  const handleCreateDocument =
    async () => {
      const document =
        await documentService.create({
          title: "Untitled Document",
          owner_id:
            actual_current_user,
        });

      setDocuments((prev) => [
        document,
        ...prev,
      ]);
    };

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <div className="container py-8 space-y-8">
      <DashboardHeader
        onCreateDocument={
          handleCreateDocument
        }
      />

      <DashboardSection
        title="My Documents"
      >
        <DocumentList
          documents={documents}
        />
      </DashboardSection>
    </div>
  );
};