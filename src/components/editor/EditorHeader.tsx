import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";

import { SaveStatus } from "./SaveStatus";
import { RenameDocumentInput } from "./RenameDocumentInput";
import { UploadButton } from "../upload/UploadButton";
import { useState } from "react";

interface Props {
  title: string;
  saved: boolean;
  onBack: () => void;
  onTitleChange: (value: string) => void;
  onShare: () => void;
}

export const EditorHeader = ({
  title,
  saved,
  onBack,
  onTitleChange,
  onShare,
}: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>

        <RenameDocumentInput value={title} onChange={onTitleChange} />
      </div>
      <div className="flex items-center gap-2">

        <Button variant="outline" onClick={onShare}>
          Share
        </Button>

        <SaveStatus saved={saved} />
      </div>
    </div>
  );
};
