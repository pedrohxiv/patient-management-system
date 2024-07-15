import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  count: number;
  icon: string;
  label: string;
  type: "appointments" | "pending" | "cancelled";
}

export const StatCard = ({ count = 0, icon, label, type }: Props) => {
  return (
    <div
      className={cn("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={label}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <p className="text-14-regular">{label}</p>
    </div>
  );
};
