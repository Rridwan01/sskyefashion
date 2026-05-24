"use client";

import { deleteProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this piece from inventory?")) {
      return;
    }
    setLoading(true);
    try {
      const res = await deleteProduct(id);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || "Failed to delete product.");
      }
    } catch (err) {
      alert("An error occurred while deleting the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="text-red-400/70 hover:text-red-400 transition-colors disabled:opacity-50 inline-flex items-center"
    >
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />}
      Delete
    </button>
  );
}
