import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { listRecentDocuments, moveDocumentToTrash } from "../../services/folder.service";
import { DocumentListItem } from "./DocumentListItem";
import type { DocumentRecord } from "../../types";

interface RecentDocumentsProps {
  onOpenDocument: (doc: DocumentRecord) => void;
  limit?: number;
}

export function RecentDocuments({ onOpenDocument, limit = 10 }: RecentDocumentsProps) {
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const recent = await listRecentDocuments(limit);
      setDocs(recent);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, [limit]);

  async function handleMoveToTrash(doc: DocumentRecord) {
    await moveDocumentToTrash(doc.id);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  }

  return (
    <section>
      <div className="mb-2 flex items-center gap-2 px-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Recent</h2>
      </div>

      {loading && <p className="px-3 py-2 text-sm text-muted-foreground">Loading...</p>}

      {!loading && docs.length === 0 && (
        <p className="px-3 py-2 text-sm text-muted-foreground">
          Documents you open will show up here.
        </p>
      )}

      <div className="space-y-0.5">
        {docs.map((doc) => (
          <DocumentListItem
            key={doc.id}
            document={doc}
            dateLabel="Opened"
            onOpen={onOpenDocument}
            onMoveToTrash={handleMoveToTrash}
          />
        ))}
      </div>
    </section>
  );
}