import Image from "next/image";
import Link from "next/link";

import { StatCard } from "@/components/stat-card";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getAppointments } from "@/lib/actions/appointment";

const AdminPage = async () => {
  const appointments = await getAppointments();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
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
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            count={appointments.scheduledCount}
            icon="/assets/icons/appointments.svg"
            label="Scheduled appointments"
            type="appointments"
          />
          <StatCard
            count={appointments.pendingCount}
            icon="/assets/icons/pending.svg"
            label="Pending appointments"
            type="pending"
          />
          <StatCard
            count={appointments.cancelledCount}
            icon="/assets/icons/cancelled.svg"
            label="Cancelled appointments"
            type="cancelled"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
