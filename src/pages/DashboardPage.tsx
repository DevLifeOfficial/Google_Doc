import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { documentService } from "../services";
import type { Document } from "../types";
import { Sidebar } from "../components/sidebar/sidebar";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DocumentCard } from "../components/documents/DocumentCard";
import { LoadingState } from "../components/common/LoadingState";
import { ErrorState } from "../components/common/ErrorState";
import { UploadDialog } from "../components/upload/UploadDialog";
import { actual_current_user } from "../constants/current-user";
import { TemplatesSection } from "../components/dashboard/TemplatesSelection";

export const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const loadDocuments = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await documentService.getAll();
      setDocuments(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDocument = async () => {
    const document = await documentService.create({
      title: "Untitled Document",
      owner_id: actual_current_user,
    });

    setDocuments((prev) => [document, ...prev]);
    navigate(`/documents/${document.id}`);
  };

  async function handleFileUpload(file: File) {
    try {
      const document = await documentService.createFromFile(
        file,
        actual_current_user
      );

      setUploadOpen(false);
      navigate(`/documents/${document.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      await documentService.delete(id);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    if (!query.trim()) return documents;
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [documents, query]);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />

      <div className="w-full h-screen overflow-y-auto">
        <div className="mx-auto max-w-8xl space-y-8 px-4 py-6 sm:px-8 sm:py-8">
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a document..."
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>

          <DashboardHeader
            onCreateDocument={handleCreateDocument}
            onUpload={() => setUploadOpen(true)}
          />

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                My Documents
              </h2>
              {documents.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {filteredDocuments.length} of {documents.length}
                </span>
              )}
            </div>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState
                message="We couldn't load your documents."
                onRetry={loadDocuments}
              />
            ) : filteredDocuments.length === 0 ? (
              <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  {query
                    ? "No documents match your search."
                    : "No documents yet — create your first one above."}
                </p>

              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>

          <TemplatesSection onSelect={() => handleCreateDocument()} />
        </div>
      </div>

      <UploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onFileSelected={handleFileUpload}
      />
    </div>
  );
};