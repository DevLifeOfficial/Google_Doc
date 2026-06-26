import type { Editor } from "@tiptap/react";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
} from "lucide-react";

import { Button } from "../ui/button";

interface Props {
  editor: Editor;
}

interface ToolbarButtonConfig {
  icon: typeof Bold;
  label: string;
  isActive: () => boolean;
  onClick: () => void;
}

export const EditorToolbar = ({ editor }: Props) => {
  const markButtons: ToolbarButtonConfig[] = [
    {
      icon: Bold,
      label: "Bold",
      isActive: () => editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: Italic,
      label: "Italic",
      isActive: () => editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: UnderlineIcon,
      label: "Underline",
      isActive: () => editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
  ];

  const blockButtons: ToolbarButtonConfig[] = [
    {
      icon: Heading1,
      label: "Heading",
      isActive: () => editor.isActive("heading", { level: 1 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: List,
      label: "Bullet list",
      isActive: () => editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: ListOrdered,
      label: "Numbered list",
      isActive: () => editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
  ];

  const renderGroup = (buttons: ToolbarButtonConfig[]) =>
    buttons.map(({ icon: Icon, label, isActive, onClick }) => {
      const active = isActive();

      return (
        <Button
          key={label}
          type="button"
          size="icon"
          variant={active ? "default" : "outline"}
          aria-label={label}
          aria-pressed={active}
          onClick={onClick}
          className={`h-8 w-8 shrink-0 ${active ? "bg-primary text-primary-foreground" : ""}`}
        >
          <Icon size={16} />
        </Button>
      );
    });

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b bg-muted/30 p-2">
      {renderGroup(markButtons)}
      <div className="mx-1 h-5 w-px shrink-0 bg-border" />
      {renderGroup(blockButtons)}
    </div>
  );
};