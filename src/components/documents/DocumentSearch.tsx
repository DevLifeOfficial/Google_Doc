import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type DocumentRecord } from "../../types/document.types";
import { DocumentListItem } from "./DocumentListItem";
import { searchDocuments } from "../../services/folder.service";

interface DocumentSearchProps {
  onOpenDocument: (doc: DocumentRecord) => void;
  onMoveToTrash?: (doc: DocumentRecord) => void;
}

export function DocumentSearch({ onOpenDocument, onMoveToTrash }: DocumentSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const docs = await searchDocuments(query);
        setResults(docs);
      } catch (err) {
        console.error("Search failed", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250); // debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-md border bg-background py-2 pl-9 pr-9 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="mt-2 rounded-md border bg-popover p-1">
          {loading && <p className="px-3 py-2 text-sm text-muted-foreground">Searching...</p>}

          {!loading && results.length === 0 && (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No documents match &ldquo;{query}&rdquo;.
            </p>
          )}

          {!loading &&
            results.map((doc) => (
              <DocumentListItem
                key={doc.id}
                document={doc}
                onOpen={onOpenDocument}
                onMoveToTrash={onMoveToTrash}
              />
            ))}
        </div>
      )}
    </div>
  );
}