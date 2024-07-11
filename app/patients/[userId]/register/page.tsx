import Image from "next/image";

import { RegisterForm } from "@/components/forms/register-form";
import { getUser } from "@/lib/actions/patient";

const RegisterPage = async ({ params }: SearchParamProps) => {
  const user = await getUser(params.userId);

  return (
    <div className="flex h-screen max-h-sreen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex- py-10">
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
          <RegisterForm user={user} />
          <div className="py-6 2xl:py-12 flex justify-center">
            <p className="copyright">&copy; 2024 Patient Management System.</p>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default RegisterPage;
