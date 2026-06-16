interface Props {
  saved: boolean;
}

export const SaveStatus = ({
  saved,
}: Props) => {
  return (
    <span className="text-sm text-muted-foreground">
      {saved ? "Saved" : "Saving..."}
    </span>
  );
};