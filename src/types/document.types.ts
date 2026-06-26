export interface Document {
  id: string;
  title: string;
  content: Record<string, unknown>;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentPayload {
  title?: string;
  owner_id: string;
  content?: Record<string, unknown>;
}

export interface UpdateDocumentPayload {
  title?: string;
  content?: Record<string, unknown>;
}

export interface DocumentRecord {
  id: string;
  title: string;
  owner_id: string;
  folder_id: string | null;
  is_trashed: boolean;
  trashed_at: string | null;
  last_opened_at: string | null;
  updated_at: string;
  created_at: string;
}
 
export interface FolderRecord {
  id: string;
  name: string;
  owner_id: string;
  parent_folder_id: string | null;
  created_at: string;
}