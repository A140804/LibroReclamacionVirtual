import { cn } from "@/lib/utils";

interface SectionTitleProps {
  number: number;
  title: string;
  className?: string;
}

export function SectionTitle({ number, title, className }: SectionTitleProps) {
  return (
    <div className={cn(
      "bg-[hsl(var(--section-header))] text-[hsl(var(--section-header-foreground))] px-4 py-3 rounded-t-md font-semibold",
      className
    )}>
      {number}. {title}
    </div>
  );
}
