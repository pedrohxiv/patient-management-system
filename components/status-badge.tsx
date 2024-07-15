import Image from "next/image";

import { statusIcon } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  status: Status;
}

export const StatusBadge = ({ status }: Props) => {
  return (
    <div
      className={cn("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={statusIcon[status]}
        height={24}
        width={24}
        alt={status}
        className="h-fit w-3"
      />
      <p
        className={cn("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};
