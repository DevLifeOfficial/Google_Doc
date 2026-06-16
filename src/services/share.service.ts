import { supabase } from "../lib/supbase";


export const shareService = {
  async shareDocument(
    documentId: string,
    userId: string
  ) {
    const { data, error } = await supabase
      .from("document_shares")
      .insert({
        document_id: documentId,
        user_id: userId,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async removeShare(
    documentId: string,
    userId: string
  ) {
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
      .select(`
        *,
        documents (*)
      `)
      .eq("user_id", userId);

    if (error) throw error;

    return data;
  },
};