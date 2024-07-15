"use client";

import Image from "next/image";
import { useState } from "react";

import { AppointmentForm } from "@/components/forms/appointment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";

interface Props {
  patientId: string;
  type: "schedule" | "cancel";
  userId: string;
  appointment?: Appointment;
}

export const AppointmentModal = ({
  patientId,
  type,
  userId,
  appointment,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn("capitalize", {
            "text-green-500": type === "schedule",
          })}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize flex items-start justify-between">
            {type} Appointment
            <Image
              src="/assets/icons/close.svg"
              height={16}
              width={16}
              alt="close"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </DialogTitle>
          <DialogDescription>
            Please fill in the document details to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          patientId={patientId}
          type={type}
          userId={userId}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
