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