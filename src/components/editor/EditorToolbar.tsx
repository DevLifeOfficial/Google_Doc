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

export const EditorToolbar = ({
  editor,
}: Props) => {
  return (
    <div className="flex gap-2 border-b p-3">
      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold size={16} />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
      >
        <Italic size={16} />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleUnderline()
            .run()
        }
      >
        <UnderlineIcon size={16} />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 1,
            })
            .run()
        }
      >
        <Heading1 size={16} />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
      >
        <List size={16} />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
      >
        <ListOrdered size={16} />
      </Button>
    </div>
  );
};