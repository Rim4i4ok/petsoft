import { cn } from "@/lib/utils.client";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn("text-2xl font-medium leading-6", className)}>
      {children}
    </h1>
  );
}

export default H1;
