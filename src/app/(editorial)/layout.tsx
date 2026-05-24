import { Header } from "@/components/layout/Header";
import { SmoothScroller } from "@/components/layout/SmoothScroller";
import { CartSlideOut } from "@/components/shop/CartSlideOut";
import { SignatureFooter } from "@/components/layout/SignatureFooter";

export default function EditorialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroller>
      <div className="noise-overlay" />
      <Header />
      {children}
      <SignatureFooter />
      <CartSlideOut />
    </SmoothScroller>
  );
}
