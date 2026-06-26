import { supabase } from "../lib/supabase";
import type { DocumentRecord, FolderRecord } from "../types";

const DOCUMENT_LIST_COLUMNS =
  "id, title, owner_id, folder_id, is_trashed, trashed_at, last_opened_at, updated_at, created_at";

// ---- Search

export async function searchDocuments(query: string): Promise<DocumentRecord[]> {
  if (!query.trim()) return [];

  const { data, error } = await supabase
    .from("documents")
    .select(DOCUMENT_LIST_COLUMNS)
    .eq("is_trashed", false)
    .ilike("title", `%${query.trim()}%`)
    .order("updated_at", { ascending: false })
    .limit(25);

  if (error) throw error;
  return data ?? [];
}

// ---- Folders 
export async function listFolders(parentFolderId: string | null): Promise<FolderRecord[]> {
  let q = supabase.from("folders").select("*").order("name", { ascending: true });
  q = parentFolderId === null ? q.is("parent_folder_id", null) : q.eq("parent_folder_id", parentFolderId);

  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function listDocumentsInFolder(folderId: string | null): Promise<DocumentRecord[]> {
  let q = supabase
    .from("documents")
    .select(DOCUMENT_LIST_COLUMNS)
    .eq("is_trashed", false)
    .order("updated_at", { ascending: false });
  q = folderId === null ? q.is("folder_id", null) : q.eq("folder_id", folderId);

  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function createFolder(name: string, parentFolderId: string | null): Promise<FolderRecord> {
  const { data: userData } = await supabase.auth.getUser();
  const ownerId = userData.user?.id;
  if (!ownerId) throw new Error("Not signed in");

  const { data, error } = await supabase
    .from("folders")
    .insert({ name, parent_folder_id: parentFolderId, owner_id: ownerId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function renameFolder(folderId: string, name: string): Promise<void> {
  const { error } = await supabase.from("folders").update({ name }).eq("id", folderId);
  if (error) throw error;
}

export async function deleteFolder(folderId: string): Promise<void> {
  const { error } = await supabase.from("folders").delete().eq("id", folderId);
  if (error) throw error;
}

export async function moveDocumentToFolder(documentId: string, folderId: string | null): Promise<void> {
  const { error } = await supabase.from("documents").update({ folder_id: folderId }).eq("id", documentId);
  if (error) throw error;
}

// ---- Recent documents

export async function listRecentDocuments(limit = 10): Promise<DocumentRecord[]> {
  const { data, error } = await supabase
    .from("documents")
    .select(DOCUMENT_LIST_COLUMNS)
    .eq("is_trashed", false)
    .not("last_opened_at", "is", null)
    .order("last_opened_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function markDocumentOpened(documentId: string): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .update({ last_opened_at: new Date().toISOString() })
    .eq("id", documentId);
  if (error) throw error;
}

// ---- Trash

export async function listTrashedDocuments(): Promise<DocumentRecord[]> {
  const { data, error } = await supabase
    .from("documents")
    .select(DOCUMENT_LIST_COLUMNS)
    .eq("is_trashed", true)
    .order("trashed_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function moveDocumentToTrash(documentId: string): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .update({ is_trashed: true, trashed_at: new Date().toISOString() })
    .eq("id", documentId);
  if (error) throw error;
}

export async function restoreDocumentFromTrash(documentId: string): Promise<void> {
  const { error } = await supabase
    .from("documents")
    .update({ is_trashed: false, trashed_at: null })
    .eq("id", documentId);
  if (error) throw error;
}

export async function deleteDocumentForever(documentId: string): Promise<void> {
  const { error } = await supabase.from("documents").delete().eq("id", documentId);
  if (error) throw error;
}