import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { EditorToolbar } from "./EditorToolbar";

interface Props {
  content?: any;
  onChange?: (content: any) => void;
}

export const RichTextEditor = ({
  content,
  onChange,
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],

    content,

    editorProps: {
      attributes: {
        class:
          "min-h-[500px] p-6 focus:outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  if (!editor) return null;

useEffect(() => {
  if (!editor || !content) return;

  const current =
    editor.getJSON();

  if (
    JSON.stringify(current) !==
    JSON.stringify(content)
  ) {
    editor.commands.setContent(content);
  }
}, [editor, content]);

  return (
    <div className="rounded-lg border bg-background">
      <EditorToolbar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
};