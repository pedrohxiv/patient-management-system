"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CustomFormField, FormFieldType } from "@/components/custom-form-field";
import { SubmitButton } from "@/components/submit-button";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment";
import { doctors } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getAppointmentSchema } from "@/lib/validations";
import { Appointment } from "@/types/appwrite.types";

interface Props {
  patientId: string;
  type: "create" | "cancel" | "schedule";
  userId: string;
  appointment?: Appointment;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppointmentForm = ({
  patientId,
  type,
  userId,
  appointment,
  setOpen,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment?.reason || "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const newAppointment = await createAppointment({
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          reason: values.reason!,
          schedule: new Date(values.schedule),
          status: status as Status,
          note: values.note,
        });

        if (newAppointment) {
          form.reset();

          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const updatedAppointment = await updateAppointment({
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
        });

        if (updatedAppointment) {
          setOpen && setOpen(false);

          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 2xl:space-y-6 flex-1"
      >
        {type === "create" && (
          <section className="mb-6 2xl:mb-12 space-y-4">
            <h1 className="header">Hi there 👋</h1>
            <p className="text-dark-700">
              Request a new appointment in 10 seconds.
            </p>
          </section>
        )}
        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
              disabled={isLoading}
            >
              {doctors.map((doctor) => (
                <SelectItem
                  key={doctor.name}
                  value={doctor.name}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={doctor.image}
                      height={32}
                      width={32}
                      alt={doctor.name}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.DATE_PICKER}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
              disabled={isLoading}
            />
            <div className="flex flex-col gap-3 xl:gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter reason for appointment"
                disabled={isLoading}
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.TEXTAREA}
                name="note"
                label="Note"
                placeholder="Enter note"
                disabled={isLoading}
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter reason for cancellation"
            disabled={isLoading}
          />
        )}
        <SubmitButton
          isLoading={isLoading}
          className={cn(
            "w-full",
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          )}
        >
          {`${type.charAt(0).toUpperCase() + type.slice(1)} Appointment`}
        </SubmitButton>
      </form>
    </Form>
  );
};
