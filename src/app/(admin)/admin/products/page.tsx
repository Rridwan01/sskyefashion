import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteProductButton } from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Inventory</h2>
          <p className="text-foreground/50 text-sm mt-1">Manage all curated pieces in the SKYE gallery.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-foreground text-background px-4 py-2 rounded-md font-medium text-sm hover:bg-foreground/90 transition-colors flex items-center justify-center w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Piece
        </Link>
      </div>

      <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full min-w-[700px] text-sm text-left">
          <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
            <tr>
              <th className="px-6 py-4 font-medium tracking-widest">Piece</th>
              <th className="px-6 py-4 font-medium tracking-widest">Category</th>
              <th className="px-6 py-4 font-medium tracking-widest">Price</th>
              <th className="px-6 py-4 font-medium tracking-widest">Stock</th>
              <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10 text-foreground/80">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-foreground/40">
                  No pieces in inventory. Add one to start curating.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-foreground/5 transition-colors">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-foreground/60">{product.category.name}</td>
                  <td className="px-6 py-4">₦{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    {product.inventory > 0 ? (
                      <span>{product.inventory}</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-foreground/50 hover:text-foreground transition-colors">Edit</Link>
                    <DeleteProductButton id={product.id} />
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
