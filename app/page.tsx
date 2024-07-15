import Image from "next/image";
import Link from "next/link";

import { PatientForm } from "@/components/forms/patient-form";
import { PasskeyModal } from "@/components/passkey-modal";

const RootPage = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-sreen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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
          <PatientForm />
          <div className="text-14-regular mt-10 2xl:mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 Patient Management System.
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="onboarding"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default RootPage;
