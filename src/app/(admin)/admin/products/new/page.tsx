import { createProduct } from "@/app/actions/product";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  async function handleAction(formData: FormData) {
    "use server";
    const res = await createProduct(formData);
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
          <h2 className="text-2xl font-semibold tracking-tight">Add Piece</h2>
          <p className="text-foreground/50 text-sm mt-1">Upload a new item to the gallery inventory with luxury attributes.</p>
        </div>
      </div>

      <form action={handleAction} className="bg-foreground/5 border border-foreground/10 rounded-xl p-8 space-y-6">
        
        {/* Basic specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="name" 
              required 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="Oversized Wool Trench"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Brand</label>
            <input 
              type="text" 
              name="brand" 
              defaultValue="SKYE Atelier"
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="SKYE Atelier"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Collection</label>
            <input 
              type="text" 
              name="collection" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="e.g., Monochrome Essentials"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Aesthetic</label>
            <input 
              type="text" 
              name="aesthetic" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="e.g., Quiet Luxury"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Price (NGN) <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              name="price" 
              step="0.01"
              required 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="1250000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Initial Inventory <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              name="inventory" 
              required 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Category <span className="text-red-500">*</span></label>
            <select 
              name="categoryId" 
              required
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors appearance-none"
            >
              <option value="" className="bg-background text-foreground">Select a Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-background text-foreground">{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <hr className="border-foreground/10" />

        {/* Descriptions and Editorial */}
        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide">Public Description <span className="text-red-500">*</span></label>
          <textarea 
            name="description" 
            required 
            rows={3}
            className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
            placeholder="A masterclass in modern tailoring offering fluid drape..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium tracking-wide">Editorial Sidelight</label>
          <textarea 
            name="editorialDescription" 
            rows={3}
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
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
              placeholder="e.g., Oversized drape, drops shoulder..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Styling Recommendations</label>
            <textarea 
              name="stylingNotes" 
              rows={2}
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors custom-scrollbar"
              placeholder="e.g., Pair with heavy silver hardware..."
            />
          </div>
        </div>

        <hr className="border-foreground/10" />

        {/* Upload and Paste URLs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide block">Upload Image Files</label>
            <input 
              type="file" 
              name="newImages" 
              multiple 
              accept="image/*"
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors file:bg-foreground file:text-background file:border-none file:px-3 file:py-1 file:rounded file:mr-4 file:text-xs file:font-medium file:cursor-pointer"
            />
            <p className="text-xs text-foreground/40">Select one or more image files to upload to Cloudinary.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Or Paste Image URLs (comma separated)</label>
            <input 
              type="text" 
              name="images" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="https://images.unsplash.com/..., https://..."
            />
          </div>
        </div>

        {/* Arrays: Sizes, Colors, Materials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Sizes Available (comma separated)</label>
            <input 
              type="text" 
              name="sizes" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="S, M, L, XL"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Colors specifications (comma separated)</label>
            <input 
              type="text" 
              name="colors" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="Black, Bone, Olive"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium tracking-wide">Materials & Blend (comma separated)</label>
            <input 
              type="text" 
              name="materials" 
              className="w-full bg-background border border-foreground/20 rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              placeholder="80% Cashmere, 20% Wool"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-foreground/10 flex justify-end">
          <button type="submit" className="bg-foreground text-background px-6 py-3 rounded-md font-medium text-sm hover:bg-foreground/90 transition-colors">
            Upload Piece
          </button>
        </div>
      </form>
    </div>
  );
}
