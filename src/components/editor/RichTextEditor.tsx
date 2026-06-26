import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { EditorToolbar } from "./EditorToolbar";

interface Props {
  content?: any;
  onChange?: (content: any) => void;
}

export const RichTextEditor = ({ content, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline],

    content,

    editorProps: {
      attributes: {
        class: "min-h-[60vh] px-6 py-8 focus:outline-none sm:px-10",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  // IMPORTANT: this effect must run on every render, so it has to come
  // before the `if (!editor) return null` guard below — otherwise the
  // number of hooks called changes between renders (Rules of Hooks violation).
  useEffect(() => {
    if (!editor || !content) return;

    const current = editor.getJSON();

    if (JSON.stringify(current) !== JSON.stringify(content)) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};