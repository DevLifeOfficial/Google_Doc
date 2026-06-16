import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { useDocument } from "../hooks/useDocument";
import { useAutoSave } from "../hooks/useAutoSave";

import { documentService, userService } from "../services";
import { ShareDialog } from "../components/sharing/ShareDialog";
import { EditorHeader } from "../components/editor/EditorHeader";
import { RichTextEditor } from "../components/editor/RichTextEditor";
import { actual_current_user } from "../constants/current-user";
import { UploadDialog } from "../components/upload/UploadDialog";
import type { User } from "../types";

export const EditorPage = () => {
  const { id } = useParams();
  
    const [shareOpen, setShareOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  const {
    document,
    loading,
  } = useDocument(id);

  const [content, setContent] =
    useState<any>();

  const [title, setTitle] =
    useState("");

  useEffect(() => {
    if (!document) return;

    setTitle(document.title);

    setContent(document.content);
  }, [document]);

  useAutoSave(id!, content);

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

  async function renameDocument(
    value: string
  ) {
    setTitle(value);

    await documentService.rename(
      id!,
      value
    );
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <EditorHeader
        title={title}
        saved={true}
        onBack={() => navigate("/")}
        onTitleChange={
          renameDocument
        }
        onShare={() => setShareOpen(true)}
      />

      <RichTextEditor
        content={content}
        onChange={setContent}
      />


<ShareDialog
  open={shareOpen}
  onOpenChange={setShareOpen}
  documentId={id!}
  users={users}
/>
    </div>
  );
};