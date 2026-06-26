import { Input } from "../ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const RenameDocumentInput = ({ value, onChange }: Props) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Document title"
      placeholder="Untitled document"
      className="h-9 min-w-0 flex-1 truncate border-transparent bg-transparent px-2 text-base font-semibold shadow-none transition-colors hover:bg-muted focus-visible:border-input focus-visible:bg-background focus-visible:ring-1 sm:text-lg"
    />
  );
};