import { ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";

import { SaveStatus } from "./SaveStatus";
import { RenameDocumentInput } from "./RenameDocumentInput";

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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-card px-4 py-3 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label="Back to documents"
        >
          <ArrowLeft size={18} />
        </Button>

        <RenameDocumentInput value={title} onChange={onTitleChange} />
      </div>

      <div className="flex items-center gap-3">
        <SaveStatus saved={saved} />

        <Button variant="outline" size="sm" onClick={onShare}>
          Share
        </Button>
      </div>
    </div>
  );
};