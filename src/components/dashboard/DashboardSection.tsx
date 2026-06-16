interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

export const DashboardSection = ({
  title,
  children,
}: DashboardSectionProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {children}
    </section>
  );
};