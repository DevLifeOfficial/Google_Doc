interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="rounded-lg border p-10 text-center">
      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="text-muted-foreground mt-2">
        {description}
      </p>
    </div>
  );
};