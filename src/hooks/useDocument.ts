import { useEffect, useState } from "react";

import { documentService } from "../services";

export function useDocument(id?: string) {
  const [document, setDocument] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!id) return;

    loadDocument();
  }, [id]);

  async function loadDocument() {
    try {
      setLoading(true);

      const data =
        await documentService.getById(id!);

      setDocument(data);
    } finally {
      setLoading(false);
    }
  }

  return {
    document,
    loading,
    reload: loadDocument,
  };
}