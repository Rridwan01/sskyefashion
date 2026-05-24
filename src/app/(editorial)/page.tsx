import { EditorialHero } from "@/components/home/EditorialHero";
import { CuratedWorlds } from "@/components/home/CuratedWorlds";
import { LookbookStrip } from "@/components/home/LookbookStrip";
import { FeaturedProductsMuseum } from "@/components/home/FeaturedProductsMuseum";
import { RequestPiece } from "@/components/home/RequestPiece";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-foreground selection:text-background">
      <EditorialHero />
      <CuratedWorlds />
      <LookbookStrip />
      <FeaturedProductsMuseum />
      <RequestPiece />
    </main>
  );
}
