import { auth } from "@/server/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

export const dynamic = "force-dynamic";

export default async function ClientDashboard() {
  const session = await auth();
  
  if (!session?.user) {
    return null;
  }

  // Fetch mock or real data
  const [requests, orders] = await Promise.all([
    prisma.itemRequest.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    prisma.order.findMany({
      where: {
        userId: session.user.id,
        status: { in: ["PROCESSING", "SHIPPED", "DELIVERED", "PENDING"] }
      },
      orderBy: { createdAt: "desc" },
    })
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Welcome Section */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-widest font-light">
                Welcome, {session.user.name?.split(' ')[0] || 'Client'}
              </h1>
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                Manage your collection and concierge requests.
              </p>
            </div>
            {(session.user as any).role === "ADMIN" && (
              <Link 
                href="/admin" 
                className="font-sans text-xs uppercase tracking-[0.2em] bg-foreground text-background px-6 py-3 hover:bg-foreground/90 transition-colors shrink-0 text-center"
              >
                Access Admin Panel
              </Link>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-16">
            
            <section className="space-y-8">
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase border-b border-muted pb-4">My Collection</h2>
              
              {orders.length === 0 ? (
                <div className="border border-dashed border-muted p-12 text-center space-y-6">
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                    Your luxury collection is currently empty.
                  </p>
                  <Link 
                    href="/shop" 
                    className="inline-block font-sans text-xs uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    Explore Archive
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {orders.map((order) => (
                    <div 
                      key={order.id} 
                      className="border border-muted p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-foreground/45 transition-colors"
                    >
                      <div>
                        <h3 className="font-sans text-xs tracking-[0.2em] uppercase">Acquisition #{order.id.slice(-6).toUpperCase()}</h3>
                        <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                          Ordered {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-sans text-xs tracking-widest uppercase font-medium">
                          ₦{order.totalAmount.toLocaleString()}
                        </span>
                        <span className="font-sans text-[10px] tracking-widest uppercase bg-foreground text-background px-3 py-1">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* Sidebar / Concierge */}
          <div className="space-y-12">
            
            <section className="space-y-6">
              <h2 className="font-sans text-sm tracking-[0.2em] uppercase border-b border-muted pb-4">Concierge Status</h2>
              
              <div className="space-y-6">
                {requests.length === 0 ? (
                  <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">No active sourcing requests.</p>
                ) : (
                  requests.map(req => (
                    <div key={req.id} className="border border-muted p-6 space-y-4">
                      <p className="font-sans text-xs tracking-wide leading-relaxed text-foreground/80 line-clamp-3">
                        "{req.description}"
                      </p>
                      <div className="flex justify-between items-end pt-4 border-t border-muted">
                        <span className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
                          {req.createdAt.toLocaleDateString()}
                        </span>
                        <span className="font-sans text-[10px] tracking-widest uppercase bg-foreground text-background px-2 py-1">
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                <Link 
                  href="/#request" 
                  className="w-full flex items-center justify-between py-4 border-b border-muted group hover:border-foreground transition-colors"
                >
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">Submit New Request</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </section>

            <section className="space-y-6 pt-12">
               <SignOutButton />
            </section>

          </div>

        </div>

      </div>
    </main>
  );
}
