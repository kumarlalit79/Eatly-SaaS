interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, centered = true }: SectionHeaderProps) => (
  <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
    <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeader;
