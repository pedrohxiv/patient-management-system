import Image from "next/image";

import { AppointmentForm } from "@/components/forms/appointment-form";
import { getPatient } from "@/lib/actions/patient";

const NewAppointmentPage = async ({ params }: SearchParamProps) => {
  const patient = await getPatient(params.userId);

  return (
    <div className="flex h-screen max-h-sreen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex flex-row items-center mb-6 2xl:mb-12">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="icon"
              className="w-fit mr-2"
            />
            <h2 className="text-xl font-semibold">Patient Management System</h2>
          </div>
          <AppointmentForm
            patientId={patient.$id}
            type="create"
            userId={params.userId}
          />
          <div className="py-6 2xl:py-12 flex justify-center">
            <p className="copyright">&copy; 2024 Patient Management System.</p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointmentPage;
