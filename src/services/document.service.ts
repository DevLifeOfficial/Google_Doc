import { supabase } from "../lib/supbase";
import type { CreateDocumentPayload, Document, User } from "../types";

export const documentService = {
  async create(payload: CreateDocumentPayload) {
    const { data, error } = await supabase
      .from("documents")
      .insert({
        title: payload.title ?? "Untitled Document",
        owner_id: payload.owner_id,
        content: payload.content ?? { type: "doc", content: [] },
      })
      .select()
      .single();

    if (error) throw error;

    return data as Document;
  },

  async createFromFile(file: File, ownerId: string) {
    const text = await file.text();

    const tiptapContent = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text }],
        },
      ],
    };

    return this.create({
      title: file.name.replace(/\.[^/.]+$/, ""),
      owner_id: ownerId,
      content: tiptapContent,
    });
  },

  async getAll() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return data as Document[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Document;
  },

  async rename(id: string, title: string) {
    const { data, error } = await supabase
      .from("documents")
      .update({ title, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Document;
  },

  async updateContent(id: string, content: Record<string, unknown>) {
    const { data, error } = await supabase
      .from("documents")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Document;
  },

  async delete(id: string) {
    const { error } = await supabase.from("documents").delete().eq("id", id);

    if (error) throw error;

    return true;
  },
};



