import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment";
import { doctors } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";

const SuccessPage = async ({ params, searchParams }: SearchParamProps) => {
  const appointment = await getAppointment(
    searchParams.appointmentId as string
  );

  const doctor = doctors.find(
    (doctor) => doctor.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="flex flex-row items-center">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="icon"
              className="w-fit mr-2"
            />
            <h2 className="text-xl font-semibold">Patient Management System</h2>
          </div>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              height={1000}
              width={1000}
              alt="doctor"
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
        <div className="flex flex-col-reverse md:flex-row w-full max-w-2xl items-center justify-between">
          <p className="copyright">&copy; 2024 Patient Management System.</p>
          <Button
            variant="outline"
            className="shad-primary-btn mb-4 md:mb-0"
            asChild
          >
            <Link href={`/patients/${params.userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
