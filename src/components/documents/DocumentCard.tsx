import { useNavigate } from "react-router-dom";
import { FileText, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import type { Document } from "../../types";

// Deterministic per-document gradient so the grid feels varied, like real
// thumbnails, without actually rendering document content into an image.
const GRADIENTS = [
  "linear-gradient(135deg, #8b5cf6, #6d28d9)",
  "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  "linear-gradient(135deg, #fbbf24, #ea580c)",
  "linear-gradient(135deg, #34d399, #0d9488)",
  "linear-gradient(135deg, #f472b6, #e11d48)",
  "linear-gradient(135deg, #818cf8, #4338ca)",
];

function gradientFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % GRADIENTS.length;
  }
  return GRADIENTS[Math.abs(hash)];
}

function relativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(dateString).toLocaleDateString();
}

interface DocumentCardProps {
  document: Document;
  onDelete?: (id: string) => void;
}

export const DocumentCard = ({ document, onDelete }: DocumentCardProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <button
        onClick={() => navigate(`/documents/${document.id}`)}
        className="block w-full text-left"
      >
        <div
          className="flex h-28 items-center justify-center"
          style={{ background: gradientFor(document.id) }}
        >
          <FileText className="h-8 w-8 text-white/90" />
        </div>

        <div className="p-3 pr-9">
          <p className="truncate text-sm font-semibold">{document.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Updated {relativeTime(document.updated_at)}
          </p>
        </div>
      </button>

      {onDelete && (
        <div className="absolute right-2 top-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="rounded-md p-1 text-white/80 transition-colors hover:bg-black/10 hover:text-white"
            aria-label="Document options"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 w-36 overflow-hidden rounded-md border bg-popover py-1 shadow-md">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(document.id);
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm text-destructive hover:bg-destructive/10"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};