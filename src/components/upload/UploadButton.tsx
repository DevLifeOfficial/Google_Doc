import { Upload } from "lucide-react";

import { Button } from "../ui/button";

interface UploadButtonProps {
  onClick: () => void;
}

export const UploadButton = ({
  onClick,
}: UploadButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
    >
      <Upload className="mr-2 h-4 w-4" />
      Upload File
    </Button>
  );
};