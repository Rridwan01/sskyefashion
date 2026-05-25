import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Contact Inquiries</h2>
        <p className="text-foreground/50 text-sm mt-1">Review inquiries, press requests, and custom couture orders.</p>
      </div>

      <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full min-w-[800px] text-sm text-left">
          <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
            <tr>
              <th className="px-6 py-4 font-medium tracking-widest">Client</th>
              <th className="px-6 py-4 font-medium tracking-widest">Subject</th>
              <th className="px-6 py-4 font-medium tracking-widest">Message</th>
              <th className="px-6 py-4 font-medium tracking-widest text-right">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10 text-foreground/80">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-foreground/40">
                  No inquiries received yet.
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-foreground/5 transition-colors">
                  <td className="px-6 py-4 font-medium">
                    <div>{inq.name}</div>
                    <div className="text-xs text-foreground/40 mt-0.5">{inq.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded bg-foreground/10 text-xs font-sans tracking-wider uppercase text-foreground">
                      {inq.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-foreground/60 max-w-md break-words whitespace-pre-line leading-relaxed">
                    {inq.message}
                  </td>
                  <td className="px-6 py-4 text-right text-xs text-foreground/50">
                    {new Date(inq.createdAt).toLocaleString()}
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
