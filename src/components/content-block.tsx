import { cn } from "@/lib/utils";

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
};

function ContentBlock({ children, className }: ContentBlockProps) {
  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden rounded-md bg-[#F7F8FA] shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
