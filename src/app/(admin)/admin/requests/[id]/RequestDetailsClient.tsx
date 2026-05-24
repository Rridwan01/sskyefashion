"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateItemRequestStatus } from "@/app/actions/request";
import { ArrowLeft, Loader2, CheckCircle2, XCircle, Eye, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function RequestDetailsClient({ request }: { request: any }) {
  const router = useRouter();
  const [status, setStatus] = useState(request.status);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED") => {
    setUpdating(true);
    setMessage(null);
    try {
      const res = await updateItemRequestStatus(request.id, newStatus);
      if (res.success) {
        setStatus(newStatus);
        setMessage("Request status updated successfully.");
        router.refresh();
      } else {
        setMessage(res.error || "Failed to update request status.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <Link 
          href="/admin/requests"
          className="inline-flex items-center text-xs text-foreground/50 hover:text-foreground uppercase tracking-wider mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sourcing requests
        </Link>
        <h2 className="text-2xl font-semibold tracking-tight">Concierge Sourcing Request</h2>
        <p className="text-foreground/50 text-sm mt-1">Review custom wardrobe request details for client {request.user?.email || "Guest"}.</p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg text-sm border ${message.includes("success") ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sourcing Details Card */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-medium mb-3">Client Information</h3>
            <div className="text-sm font-medium">{request.user?.name || "Guest Client"}</div>
            <div className="text-sm text-foreground/60 font-mono mt-1">{request.user?.email || "No Email Registered"}</div>
          </div>

          <hr className="border-foreground/10" />

          <div>
            <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-medium mb-3">Acquisition Details</h3>
            <p className="text-foreground/80 leading-relaxed break-words whitespace-pre-wrap">{request.description}</p>
          </div>

          {request.imageUrl && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-medium mb-3">Inspiration Image</h3>
              <div className="relative w-full aspect-[4/3] bg-foreground/5 rounded-lg overflow-hidden border border-foreground/10 max-w-md">
                <Image 
                  src={request.imageUrl} 
                  alt="Inspiration reference" 
                  fill 
                  className="object-contain" 
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Actions Sidebar */}
        <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 h-fit space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-medium mb-3">Current Status</h3>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                ${status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-400/10' : ''}
                ${status === 'REVIEWING' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10' : ''}
                ${status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-400/10' : ''}
                ${status === 'REJECTED' ? 'bg-red-500/10 text-red-600 dark:text-red-400 dark:bg-red-400/10' : ''}
              `}>
                {status}
              </span>
              {updating && <Loader2 className="w-4 h-4 animate-spin text-foreground/40" />}
            </div>
          </div>

          <hr className="border-foreground/10" />

          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-medium mb-3">Process Request</h3>
            
            <button
              onClick={() => handleStatusChange("REVIEWING")}
              disabled={updating || status === "REVIEWING"}
              className="w-full py-2.5 px-4 rounded bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-xs font-medium uppercase tracking-widest flex items-center justify-between transition-colors disabled:opacity-50"
            >
              <span>Set to Reviewing</span>
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </button>

            <button
              onClick={() => handleStatusChange("ACCEPTED")}
              disabled={updating || status === "ACCEPTED"}
              className="w-full py-2.5 px-4 rounded bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium uppercase tracking-widest flex items-center justify-between transition-colors disabled:opacity-50"
            >
              <span>Accept & Acquire</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            <button
              onClick={() => handleStatusChange("REJECTED")}
              disabled={updating || status === "REJECTED"}
              className="w-full py-2.5 px-4 rounded bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium uppercase tracking-widest flex items-center justify-between transition-colors disabled:opacity-50"
            >
              <span>Reject Request</span>
              <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </button>

            <button
              onClick={() => handleStatusChange("PENDING")}
              disabled={updating || status === "PENDING"}
              className="w-full py-2.5 px-4 rounded bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium uppercase tracking-widest flex items-center justify-between transition-colors disabled:opacity-50"
            >
              <span>Reset to Pending</span>
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
