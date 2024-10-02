import { cn } from "@/lib/utils";

export const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={cn(
        "flex justify-center items-center gap-2 rounded-md bg-blue-500 hover:bg-blue-600 active:bg-blue-600 disabled:bg-gray-200 transition-colors font-semibold text-white px-3 py-2",
        className
      )}
    />
  );
};
