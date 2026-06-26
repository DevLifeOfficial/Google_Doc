import { Trash2, Info } from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteDocumentForever,
  listTrashedDocuments,
  restoreDocumentFromTrash,
} from "../../services/folder.service";
import type { DocumentRecord } from "../../types";
import { DocumentListItem } from "../documents/DocumentListItem";

export function Trash() {
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    setLoading(true);
    try {
      const trashed = await listTrashedDocuments();
      setDocs(trashed);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleRestore(doc: DocumentRecord) {
    await restoreDocumentFromTrash(doc.id);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  }

  async function handleDeleteForever(doc: DocumentRecord) {
    if (!confirm(`Permanently delete "${doc.title || "Untitled document"}"? This can't be undone.`)) {
      return;
    }
    await deleteDocumentForever(doc.id);
    setDocs((prev) => prev.filter((d) => d.id !== doc.id));
  }

  return (
    <section>
      <div className="mb-2 flex items-center gap-2 px-2">
        <Trash2 className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-foreground">Trash</h2>
      </div>

      <div className="mb-2 flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>Documents in trash can be restored. Deleting forever can&rsquo;t be undone.</span>
      </div>

      {loading && <p className="px-3 py-2 text-sm text-muted-foreground">Loading...</p>}

      {!loading && docs.length === 0 && (
        <p className="px-3 py-2 text-sm text-muted-foreground">Trash is empty.</p>
      )}

      <div className="space-y-0.5">
        {docs.map((doc) => (
          <DocumentListItem
            key={doc.id}
            document={doc}
            dateLabel="Trashed"
            onRestore={handleRestore}
            onDeleteForever={handleDeleteForever}
          />
        ))}
      </div>
    </section>
  );
}