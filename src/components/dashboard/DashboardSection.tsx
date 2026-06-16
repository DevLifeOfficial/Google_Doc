interface DashboardSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const DashboardSection = ({
  title,
  description,
  children,
}: DashboardSectionProps) => {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl text-black font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        {children}
      </div>
    </section>
  );
};