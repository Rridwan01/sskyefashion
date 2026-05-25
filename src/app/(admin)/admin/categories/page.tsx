import { prisma } from "@/lib/prisma";
import { createCategory } from "@/app/actions/category";

export const dynamic = "force-dynamic";

export default async function CategoriesAdminPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } }
  });

  return (
    <div className="space-y-8 max-w-7xl flex flex-col md:flex-row gap-8">
      {/* List */}
      <div className="w-full md:w-2/3 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Categories</h2>
          <p className="text-foreground/50 text-sm mt-1">Organize pieces into collections or styles.</p>
        </div>

        <div className="border border-foreground/10 rounded-xl bg-foreground/5 overflow-hidden">
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full min-w-[600px] text-sm text-left">
            <thead className="text-xs uppercase bg-foreground/5 text-foreground/50 border-b border-foreground/10">
              <tr>
                <th className="px-6 py-4 font-medium tracking-widest">Name</th>
                <th className="px-6 py-4 font-medium tracking-widest">Slug</th>
                <th className="px-6 py-4 font-medium tracking-widest">Products</th>
                <th className="px-6 py-4 font-medium tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10 text-foreground/80">
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-foreground/40">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{cat.name}</td>
                    <td className="px-6 py-4 text-foreground/60">{cat.slug}</td>
                    <td className="px-6 py-4">{cat._count.products}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      <button className="text-foreground/50 hover:text-foreground transition-colors">Edit</button>
                      <button className="text-red-600 dark:text-red-400 font-medium">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Add Form */}
      <div className="w-full md:w-1/3">
        <form 
          action={async (formData) => {
            "use server";
            await createCategory(formData);
          }} 
          className="bg-foreground/5 border border-foreground/10 rounded-xl p-6 space-y-6 sticky top-8"
        >
          <h3 className="font-medium tracking-wide">Add Category</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide text-foreground/70">Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="e.g. Street Luxury"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide text-foreground/70">Cover Image URL</label>
            <input 
              type="text" 
              name="image" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="w-full bg-foreground text-background px-6 py-3 rounded-md font-medium text-sm hover:bg-foreground/90 transition-colors">
            Create Category
          </button>
        </form>
      </div>

    </div>
  );
}
