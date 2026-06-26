import { supabase } from "../lib/supbase";
import type { User } from "../types";

export const shareService = {
  async shareDocument(documentId: string, userId: string) {
    const { data, error } = await supabase
      .from("document_shares")
      .insert({ document_id: documentId, user_id: userId })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async removeShare(documentId: string, userId: string) {
    const { error } = await supabase
      .from("document_shares")
      .delete()
      .eq("document_id", documentId)
      .eq("user_id", userId);

    if (error) throw error;

    return true;
  },

  async getSharedDocuments(userId: string) {
    const { data, error } = await supabase
      .from("document_shares")
      .select(`*, documents (*)`)
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },

  // NEW: needed by ShareDialog to show who already has access to a
  // document. This direction (by document_id) didn't exist before —
  // only the reverse (getSharedDocuments, by user_id) did.
  async getDocumentShares(documentId: string) {
    const { data, error } = await supabase
      .from("document_shares")
      .select(`user_id, users (*)`)
      .eq("document_id", documentId);

    if (error) throw error;

    return (data ?? []).map((row: any) => row.users) as User[];
  },
};