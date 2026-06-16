import {
  Calendar,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
} from "../../components/ui/card";

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
      className="
        group
        cursor-pointer
        overflow-hidden
        border
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
      onClick={() =>
        navigate(`/documents/${document.id}`)
      }
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-5 w-5 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="line-clamp-1 text-lg font-semibold text-foreground">
                {document.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />

                <span>
                  Updated{" "}
                  {new Date(
                    document.updated_at
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <ChevronRight
            className="
              h-5
              w-5
              text-muted-foreground
              transition-transform
              group-hover:translate-x-1
            "
          />
        </div>
      </CardContent>
    </Card>
  );
};