import { FileText, MoreVertical, Trash2, RotateCcw, FolderInput, X } from "lucide-react";
import { useState } from "react";
import type { DocumentRecord } from "../../types/document.types";
import MenuAction from "./MenuActions";

function formatRelativeDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

interface DocumentListItemProps {
  document: DocumentRecord;
  dateLabel?: string; // e.g. "Opened" | "Edited" | "Trashed" — defaults to "Edited"
  onOpen?: (doc: DocumentRecord) => void;
  onMoveToFolder?: (doc: DocumentRecord) => void;
  onMoveToTrash?: (doc: DocumentRecord) => void;
  onRestore?: (doc: DocumentRecord) => void;
  onDeleteForever?: (doc: DocumentRecord) => void;
}

export function DocumentListItem({
  document,
  dateLabel = "Edited",
  onOpen,
  onMoveToFolder,
  onMoveToTrash,
  onRestore,
  onDeleteForever,
}: DocumentListItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const dateValue =
    dateLabel === "Opened"
      ? document.last_opened_at
      : dateLabel === "Trashed"
        ? document.trashed_at
        : document.updated_at;

  return (
    <div className="group flex items-center justify-between gap-3 rounded-md px-3 py-2 hover:bg-accent/50">
      <button
        type="button"
        onClick={() => onOpen?.(document)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm font-medium text-foreground">
          {document.title || "Untitled document"}
        </span>
      </button>

      <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
        {dateLabel} {formatRelativeDate(dateValue)}
      </span>

      <div className="relative shrink-0">
        <button
          type="button"
          aria-label="Document actions"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-md p-1.5 text-muted-foreground opacity-0 hover:bg-accent group-hover:opacity-100 focus:opacity-100"
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 z-10 mt-1 w-44 rounded-md border bg-popover p-1 shadow-md"
            onMouseLeave={() => setMenuOpen(false)}
          >
            {onMoveToFolder && (
              <MenuAction
                icon={<FolderInput className="h-4 w-4" />}
                label="Move to folder"
                onClick={() => {
                  onMoveToFolder(document);
                  setMenuOpen(false);
                }}
              />
            )}
            {onMoveToTrash && (
              <MenuAction
                icon={<Trash2 className="h-4 w-4" />}
                label="Move to trash"
                onClick={() => {
                  onMoveToTrash(document);
                  setMenuOpen(false);
                }}
              />
            )}
            {onRestore && (
              <MenuAction
                icon={<RotateCcw className="h-4 w-4" />}
                label="Restore"
                onClick={() => {
                  onRestore(document);
                  setMenuOpen(false);
                }}
              />
            )}
            {onDeleteForever && (
              <MenuAction
                icon={<X className="h-4 w-4" />}
                label="Delete forever"
                destructive
                onClick={() => {
                  onDeleteForever(document);
                  setMenuOpen(false);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
