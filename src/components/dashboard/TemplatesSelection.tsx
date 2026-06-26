import { Sparkles } from "lucide-react";

// Placeholder data — wire `onSelect` up to create a document pre-filled
// with each template's starting content once that exists on the backend.
const TEMPLATES = [
  { id: "blank", name: "Blank document", accent: "bg-slate-100 text-slate-500" },
  { id: "meeting", name: "Meeting notes", accent: "bg-blue-50 text-blue-600" },
  { id: "brief", name: "Project brief", accent: "bg-violet-50 text-violet-600" },
  { id: "memo", name: "Team memo", accent: "bg-amber-50 text-amber-600" },
];

interface TemplatesSectionProps {
  onSelect?: (templateId: string) => void;
}

export const TemplatesSection = ({ onSelect }: TemplatesSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Start from a template
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect?.(template.id)}
            className="flex flex-col items-center gap-3 rounded-xl border bg-card p-5 text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${template.accent}`}
            >
              <Sparkles size={18} />
            </span>
            <span className="text-sm font-medium">{template.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};