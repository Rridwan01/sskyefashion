import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RequestsAdminPage() {
  const requests = await prisma.itemRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true }
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Concierge Requests</h2>
        <p className="text-foreground/50 text-sm mt-1">Manage custom sourcing requests from clientele.</p>
      </div>

      <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full min-w-[750px] text-sm text-left">
          <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
            <tr>
              <th className="px-6 py-4 font-medium tracking-widest">Client</th>
              <th className="px-6 py-4 font-medium tracking-widest">Description</th>
              <th className="px-6 py-4 font-medium tracking-widest">Date</th>
              <th className="px-6 py-4 font-medium tracking-widest">Status</th>
              <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10 text-foreground/80">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-foreground/40">
                  No pending concierge requests.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id} className="hover:bg-foreground/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{req.user?.email || "Guest"}</td>
                  <td className="px-6 py-4 text-foreground/60 max-w-xs truncate">{req.description}</td>
                  <td className="px-6 py-4">{req.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${req.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-400/10' : ''}
                      ${req.status === 'REVIEWING' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10' : ''}
                      ${req.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-400/10' : ''}
                      ${req.status === 'REJECTED' ? 'bg-red-500/10 text-red-600 dark:text-red-400 dark:bg-red-400/10' : ''}
                    `}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/requests/${req.id}`} className="text-foreground/50 hover:text-foreground transition-colors">View Details</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
