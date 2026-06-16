import { Card, CardContent } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import type { Document } from "../../types";

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({
  document,
}: DocumentCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={() =>
        navigate(`/documents/${document.id}`)
      }
    >
      <CardContent className="p-4">
        <h3 className="font-semibold">
          {document.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          Updated{" "}
          {new Date(
            document.updated_at
          ).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};