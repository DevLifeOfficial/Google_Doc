
import { markDocumentOpened } from "../services";
import { RecentDocuments } from "../components/documents/RecentDocuments";
import { useNavigate } from "react-router-dom";


export function RecentDocumentsPage() {

  const navigate = useNavigate();
  function openDocument(doc: any) {
    markDocumentOpened(doc.id); 
    navigate(`/documents/${doc.id}`);
  }

  return (
   <div className="flex-1 overflow-auto">
  <div className="mx-auto max-w-5xl px-8 py-8">
    <RecentDocuments onOpenDocument={openDocument} />
  </div>
</div>
  );
}
