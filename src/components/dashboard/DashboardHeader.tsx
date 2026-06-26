import { FilePlus2, Upload } from "lucide-react";

interface DashboardHeaderProps {
  onCreateDocument: () => void;
  onUpload: () => void;
}

export const DashboardHeader = ({
  onCreateDocument,
  onUpload,
}: DashboardHeaderProps) => {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Let's get you started
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-muted-foreground">
            Create a new document from scratch, or import an existing file
            to keep working on it here.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onCreateDocument}
            className="group flex items-center gap-3 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <FilePlus2 size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold">New Document</span>
              <span className="block text-xs text-muted-foreground">
                Start writing from scratch
              </span>
            </span>
          </button>

          <button
            onClick={onUpload}
            className="group flex items-center gap-3 rounded-xl border bg-background p-4 text-left transition-all hover:border-primary hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
              <Upload size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold">Import File</span>
              <span className="block text-xs text-muted-foreground">
                Bring in a .txt or .md file
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};