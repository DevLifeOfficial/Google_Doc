import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const DashboardSection = ({
  title,
  description,
  children,
}: DashboardSectionProps) => {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-5">
        {children}
      </div>
    </section>
  );
};