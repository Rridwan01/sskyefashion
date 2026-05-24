import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AppointmentsAdminPage() {
  const appointments = await prisma.showroomAppointment.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Showroom Appointments</h2>
        <p className="text-foreground/50 text-sm mt-1">Manage private client wardrobe viewing sessions.</p>
      </div>

      <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
            <tr>
              <th className="px-6 py-4 font-medium tracking-widest">Client</th>
              <th className="px-6 py-4 font-medium tracking-widest">Showroom</th>
              <th className="px-6 py-4 font-medium tracking-widest">Date</th>
              <th className="px-6 py-4 font-medium tracking-widest">Time Slot</th>
              <th className="px-6 py-4 font-medium tracking-widest">Client Notes</th>
              <th className="px-6 py-4 font-medium tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10 text-foreground/80">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-foreground/40">
                  No appointments booked yet.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-foreground/5 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div>{appt.name}</div>
                    <div className="text-xs text-foreground/40 mt-0.5">{appt.email}</div>
                  </td>
                  <td className="px-6 py-4 text-foreground/60">{appt.showroom}</td>
                  <td className="px-6 py-4">{new Date(appt.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-mono text-xs">{appt.timeSlot}</td>
                  <td className="px-6 py-4 text-foreground/50 max-w-xs truncate" title={appt.notes || ""}>
                    {appt.notes || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${appt.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-400/10' : ''}
                      ${appt.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-400/10' : ''}
                      ${appt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-600 dark:text-red-400 dark:bg-red-400/10' : ''}
                    `}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
