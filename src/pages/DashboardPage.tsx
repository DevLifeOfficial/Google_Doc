import { useEffect, useState } from "react";

import { documentService } from "../services";
import type { Document } from "../types";

import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardSection } from "../components/dashboard/DashboardSection";
import { DocumentList } from "../components/documents/DocumentList";
import { actual_current_user } from "../constants/current-user";
import { UploadDialog } from "../components/upload/UploadDialog";
import { useNavigate } from "react-router-dom";

export const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
     const [uploadOpen, setUploadOpen] = useState(false);

     const navigate = useNavigate();
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

    async function handleFileUpload(
  file: File
) {
  try {
    const document =
      await documentService.createFromFile(
        file,
        actual_current_user
      );

    setUploadOpen(false);

    navigate(`/documents/${document.id}`);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div className="container py-8 space-y-8">
      <DashboardHeader
        onCreateDocument={
          handleCreateDocument
        }
          onUpload={() => setUploadOpen(true)}
      />

      <DashboardSection
        title="My Documents"
      >
        <DocumentList
          documents={documents}
        />
      </DashboardSection>

           <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onFileSelected={handleFileUpload}
      />
    </div>
  );
};