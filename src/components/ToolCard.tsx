import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export const ToolCard = ({ title, description, icon, children, className }: ToolCardProps) => {
  return (
    <Card className={cn(
      "p-6 bg-gradient-glass backdrop-blur-lg border-border/50 shadow-elevation",
      "hover:shadow-glow transition-all duration-300 hover:scale-[1.02]",
      className
    )}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </Card>
  );
};