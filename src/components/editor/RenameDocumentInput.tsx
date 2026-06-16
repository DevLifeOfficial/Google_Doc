import { Input } from "../ui/input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const RenameDocumentInput = ({
  value,
  onChange,
}: Props) => {
  return (
    <Input
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="max-w-md text-lg font-semibold"
    />
  );
};