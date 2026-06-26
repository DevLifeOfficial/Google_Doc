import {
  Folder,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Pencil,
  Trash2,
  Home,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FolderRecord } from "../../types/index.ts";
import {
  createFolder,
  deleteFolder,
  listFolders,
  renameFolder,
} from "../../services/folder.service.ts";

interface FolderSidebarProps {
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

interface FolderNodeProps {
  folder: FolderRecord;
  depth: number;
  selectedFolderId: string | null;
  onSelectFolder: (folderId: string | null) => void;
}

export function FolderSidebar({
  selectedFolderId,
  onSelectFolder,
}: FolderSidebarProps) {
  const [rootFolders, setRootFolders] = useState<FolderRecord[]>([]);
  const [creating, setCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  async function refresh() {
    const folders = await listFolders(null);
    setRootFolders(folders);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreateFolder() {
    const name = newFolderName.trim();
    if (!name) {
      setCreating(false);
      return;
    }
    await createFolder(name, null);
    setNewFolderName("");
    setCreating(false);
    refresh();
  }

  return (
    <nav className="w-56 shrink-0 space-y-1">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs font-semibold uppercase text-muted-foreground">
          Folders
        </span>
        <button
          type="button"
          aria-label="New folder"
          onClick={() => setCreating(true)}
          className="rounded-md p-1 text-muted-foreground hover:bg-accent"
        >
          <FolderPlus className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelectFolder(null)}
        className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
          selectedFolderId === null
            ? "bg-accent font-medium"
            : "hover:bg-accent/50"
        }`}
      >
        <Home className="h-4 w-4" />
        All documents
      </button>

      {rootFolders.map((folder) => (
        <FolderNode
          key={folder.id}
          folder={folder}
          depth={0}
          selectedFolderId={selectedFolderId}
          onSelectFolder={onSelectFolder}
        />
      ))}

      {creating && (
        <div className="flex items-center gap-2 px-2 py-1">
          <Folder className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateFolder();
              if (e.key === "Escape") setCreating(false);
            }}
            onBlur={handleCreateFolder}
            placeholder="Folder name"
            className="w-full rounded-md border bg-background px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}
    </nav>
  );
}

function FolderNode({
  folder,
  depth,
  selectedFolderId,
  onSelectFolder,
}: FolderNodeProps) {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<FolderRecord[]>([]);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(folder.name);

  async function loadChildren() {
    const subfolders = await listFolders(folder.id);
    setChildren(subfolders);
  }

  useEffect(() => {
    if (expanded) loadChildren();
  }, [expanded]);

  async function handleRename() {
    const trimmed = name.trim();
    setRenaming(false);
    if (!trimmed || trimmed === folder.name) {
      setName(folder.name);
      return;
    }
    await renameFolder(folder.id, trimmed);
  }

  async function handleDelete() {
    if (
      !confirm(
        `Delete folder "${folder.name}"? Documents inside will move to All documents.`,
      )
    )
      return;
    await deleteFolder(folder.id);
    if (selectedFolderId === folder.id) onSelectFolder(null);
  }

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-md px-2 py-1.5 text-sm ${
          selectedFolderId === folder.id
            ? "bg-accent font-medium"
            : "hover:bg-accent/50"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="shrink-0"
        >
          {expanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        <button
          type="button"
          onClick={() => onSelectFolder(folder.id)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
          {renaming ? (
            <input
              title="Rename folder"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              onBlur={handleRename}
              className="w-full rounded-sm border bg-background px-1 text-sm outline-none"
            />
          ) : (
            <span className="truncate">{folder.name}</span>
          )}
        </button>

        <div className="hidden shrink-0 items-center gap-0.5 group-hover:flex">
          <button
            type="button"
            aria-label="Rename folder"
            onClick={() => setRenaming(true)}
            className="rounded-sm p-1 text-muted-foreground hover:bg-accent"
          >
            <Pencil className="h-3 w-3" />
          </button>
          <button
            type="button"
            aria-label="Delete folder"
            onClick={handleDelete}
            className="rounded-sm p-1 text-muted-foreground hover:bg-accent"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      {expanded &&
        children.map((child) => (
          <FolderNode
            key={child.id}
            folder={child}
            depth={depth + 1}
            selectedFolderId={selectedFolderId}
            onSelectFolder={onSelectFolder}
          />
        ))}
    </div>
  );
}
