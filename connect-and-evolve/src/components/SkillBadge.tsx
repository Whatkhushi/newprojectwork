
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level?: string;
  className?: string;
}

export const SkillBadge = ({ name, level, className }: SkillBadgeProps) => {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm",
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      "transition-all duration-200 hover:scale-105 hover:bg-purple-200 dark:hover:bg-purple-800",
      className
    )}>
      {name}
      {level && (
        <span className="ml-1 text-xs opacity-75">• {level}</span>
      )}
    </span>
  );
};
