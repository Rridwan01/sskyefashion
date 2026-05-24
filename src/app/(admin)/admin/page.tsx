import { ArrowUpRight, Package, Tag, Users } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-foreground/50 text-sm mt-1">High-level metrics for SKYE FASHION.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-foreground/10 rounded-lg">
              <Package className="w-5 h-5 text-foreground/70" />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              +12% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <div className="mt-6">
            <h3 className="text-3xl font-semibold tracking-tight">124</h3>
            <p className="text-sm text-foreground/50 mt-1 uppercase tracking-widest">Active Pieces</p>
          </div>
        </div>

        {/* Metric Card */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-foreground/10 rounded-lg">
              <Users className="w-5 h-5 text-foreground/70" />
            </div>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
              +5% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <div className="mt-6">
            <h3 className="text-3xl font-semibold tracking-tight">8,240</h3>
            <p className="text-sm text-foreground/50 mt-1 uppercase tracking-widest">Clientele</p>
          </div>
        </div>

        {/* Metric Card */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-foreground/10 rounded-lg">
              <Tag className="w-5 h-5 text-foreground/70" />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-3xl font-semibold tracking-tight">14</h3>
            <p className="text-sm text-foreground/50 mt-1 uppercase tracking-widest">Concierge Requests</p>
          </div>
        </div>

      </div>

      {/* Recent Activity Mock */}
      <div className="mt-12">
        <h3 className="text-lg font-medium tracking-wide mb-4">Recent Activity</h3>
        <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-medium tracking-widest">Piece</th>
                <th className="px-6 py-4 font-medium tracking-widest">Action</th>
                <th className="px-6 py-4 font-medium tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10 text-foreground/70">
              <tr>
                <td className="px-6 py-4">Oversized Wool Trench</td>
                <td className="px-6 py-4"><span className="text-emerald-600 dark:text-emerald-400 font-medium">Added to Inventory</span></td>
                <td className="px-6 py-4 text-right">Just now</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Noire Eau de Parfum</td>
                <td className="px-6 py-4"><span className="text-amber-600 dark:text-amber-400 font-medium">Stock Low (2 left)</span></td>
                <td className="px-6 py-4 text-right">2h ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4">Concierge Request #102</td>
                <td className="px-6 py-4"><span className="text-blue-600 dark:text-blue-400 font-medium">New Submission</span></td>
                <td className="px-6 py-4 text-right">5h ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
