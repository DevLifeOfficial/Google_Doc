interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({
  message = "Something went wrong",
}: ErrorStateProps) => {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <p className="text-red-600">
        {message}
      </p>
    </div>
  );
};