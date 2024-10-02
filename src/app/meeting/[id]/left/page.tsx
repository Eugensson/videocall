import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonClassName } from "@/components/button";

interface LeftPageProps {
  params: { id: string };
}

const LeftPage = ({ params: { id } }: LeftPageProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You left this meeting.</p>
      <Link
        href={`/meeting/${id}`}
        className={cn(buttonClassName, "bg-gray-500 hover:bg-gray-600")}
      >
        Rejoin
      </Link>
    </div>
  );
};

export default LeftPage;
