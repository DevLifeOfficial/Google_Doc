import { useEffect } from "react";

import { documentService } from "../services";

export function useAutoSave(
  documentId: string,
  content: any
) {
  useEffect(() => {
    if (!documentId) return;

    const timer = setTimeout(async () => {
      await documentService.updateContent(
        documentId,
        content
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, [documentId, content]);
}