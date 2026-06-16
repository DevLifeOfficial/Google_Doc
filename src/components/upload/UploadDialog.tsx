import { useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (
    open: boolean
  ) => void;

  onFileSelected: (
    file: File
  ) => void;
}

export const UploadDialog = ({
  open,
  onOpenChange,
  onFileSelected,
}: UploadDialogProps) => {
  const inputRef =
    useRef<HTMLInputElement>(null);

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Upload Document
          </DialogTitle>
        </DialogHeader>

        <input
          title="file upload"
          ref={inputRef}
          type="file"
          accept=".txt,.md"
          className="hidden"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            onFileSelected(file);
          }}
        />

        <Button
          onClick={() =>
            inputRef.current?.click()
          }
        >
          Choose File
        </Button>

        <p className="text-sm text-muted-foreground">
          Supported: .txt, .md
        </p>
      </DialogContent>
    </Dialog>
  );
};