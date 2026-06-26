import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDocument } from "../hooks/useDocument";
import { useAutoSave } from "../hooks/useAutoSave";

import { documentService, userService } from "../services";
import { ShareDialog } from "../components/sharing/ShareDialog";
import { EditorHeader } from "../components/editor/EditorHeader";
import { RichTextEditor } from "../components/editor/RichTextEditor";
import { LoadingState } from "../components/common/LoadingState";
import { Button } from "../components/ui/button";
import type { User } from "../types";

export const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shareOpen, setShareOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const { document, loading } = useDocument(id);

  const [content, setContent] = useState<any>();
  const [title, setTitle] = useState("");

  // useAutoSave currently returns void, so invoke it for its side effects.
  useAutoSave(id!, content);
  const isSaving = false;

  useEffect(() => {
    if (!document) return;

    setTitle(document.title);
    setContent(document.content);
  }, [document]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function renameDocument(value: string) {
    setTitle(value);
    await documentService.rename(id!, value);
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <LoadingState />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="container mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">
          This document doesn't exist or you don't have access to it.
        </p>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to documents
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EditorHeader
        title={title}
        saved={!isSaving}
        onBack={() => navigate("/")}
        onTitleChange={renameDocument}
        onShare={() => setShareOpen(true)}
      />

      <div className="container mx-auto max-w-6xl flex-1 px-4 py-6">
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        documentId={id!}
        users={users}
      />
    </div>
  );
};