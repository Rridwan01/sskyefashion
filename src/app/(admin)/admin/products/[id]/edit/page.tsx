import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/app/actions/product";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    prisma.category.findMany(),
  ]);

  if (!product) {
    notFound();
  }

  async function handleAction(formData: FormData) {
    "use server";
    const res = await updateProduct(id, formData);
    if (res.success) {
      redirect("/admin/products");
    }
  }

  return (
    <div className="max-w-4xl space-y-8 pb-24">
      <div className="flex items-center space-x-4">
        <Link href="/admin/products" className="text-foreground/50 hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Edit Curated Piece</h2>
          <p className="text-foreground/50 text-sm mt-1">Modify inventory and catalog specifications for "{product.name}".</p>
        </div>
      </div>

      <form action={handleAction} className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 space-y-6">
        
        {/* Basic specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              defaultValue={product.name}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Brand</label>
            <input 
              type="text" 
              name="brand" 
              required 
              defaultValue={product.brand}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Collection</label>
            <input 
              type="text" 
              name="collection" 
              defaultValue={product.collection || ""}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="e.g., Late Night Edit"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Aesthetic</label>
            <input 
              type="text" 
              name="aesthetic" 
              defaultValue={product.aesthetic || ""}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="e.g., Grunge Luxury"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Price (NGN)</label>
            <input 
              type="number" 
              name="price" 
              step="0.01"
              required 
              defaultValue={product.price}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Inventory Stock</label>
            <input 
              type="number" 
              name="inventory" 
              required 
              defaultValue={product.inventory}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Category</label>
            <select 
              name="categoryId" 
              required
              defaultValue={product.categoryId}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors appearance-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-background text-foreground">{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <hr className="border-foreground/10" />

        {/* Descriptions and Editorial */}
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide">Public Description</label>
          <textarea 
            name="description" 
            required 
            rows={3}
            defaultValue={product.description}
            className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide">Editorial Sidelight</label>
          <textarea 
            name="editorialDescription" 
            rows={3}
            defaultValue={product.editorialDescription || ""}
            className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
            placeholder="Narrative prose for the product detail display..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Fit specifications</label>
            <textarea 
              name="fitNotes" 
              rows={2}
              defaultValue={product.fitNotes || ""}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
              placeholder="e.g., Oversized drape, drops shoulder..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Styling Recommendations</label>
            <textarea 
              name="stylingNotes" 
              rows={2}
              defaultValue={product.stylingNotes || ""}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
              placeholder="e.g., Pair with heavy silver hardware..."
            />
          </div>
        </div>

        <hr className="border-foreground/10" />

        {/* Arrays: Images, Sizes, Colors, Materials */}
         <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide block">Upload New Images</label>
            <input 
              type="file" 
              name="newImages" 
              multiple 
              accept="image/*"
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors file:bg-foreground file:text-background file:border-none file:px-3 file:py-1 file:rounded file:mr-4 file:text-xs file:font-medium file:cursor-pointer"
            />
            <p className="text-xs text-foreground/40">Select files to upload and append to the existing product images.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Or Modify Existing Image URLs (comma separated)</label>
            <input 
              type="text" 
              name="images" 
              defaultValue={product.images.join(", ")}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Sizes Available (comma separated)</label>
            <input 
              type="text" 
              name="sizes" 
              defaultValue={product.sizes.join(", ")}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="S, M, L, XL"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Colors specifications (comma separated)</label>
            <input 
              type="text" 
              name="colors" 
              defaultValue={product.colors.join(", ")}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="Black, Bone, Olive"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Materials & Blend (comma separated)</label>
            <input 
              type="text" 
              name="materials" 
              defaultValue={product.materials.join(", ")}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="80% Cashmere, 20% Wool"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-foreground/10 flex justify-end">
          <button type="submit" className="bg-foreground text-background px-6 py-3 rounded-md font-medium text-sm hover:bg-foreground/90 transition-colors">
            Save Modifications
          </button>
        </div>
      </form>
    </div>
  );
}
