import CommonNavbar from "./(normal)/_components/CommonNavbar";
import CommonFooter from "./(normal)/_components/CommonFooter";
import HomeHeroSection from "./_home/components/HomeHeroSection";
import HomePopularProducts from "./_home/components/HomePopularProducts";
import HomeExploreMoreSection from "./_home/components/HomeExploreMoreSection";
import HomeAboutSection from "./_home/components/HomeAboutSection";
import CartProvider from "@/modules/cart/cart.provider";

export default function Home() {
  return (
    <main>
      <CartProvider>
        <CommonNavbar />
        <HomeHeroSection />
        <HomePopularProducts />
        <HomeExploreMoreSection />
        <HomeAboutSection />
        <CommonFooter />
      </CartProvider>
    </main>
  );
}
