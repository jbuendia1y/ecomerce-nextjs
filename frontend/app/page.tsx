import CommonNavbar from "./(normal)/_components/CommonNavbar";
import CommonFooter from "./(normal)/_components/CommonFooter";
import HomeHeroSection from "./_home/components/HomeHeroSection";
import HomePopularProducts from "./_home/components/HomePopularProducts";
import HomeExploreMoreSection from "./_home/components/HomeExploreMoreSection";
import HomeAboutSection from "./_home/components/HomeAboutSection";

export default function Home() {
  return (
    <main>
      <CommonNavbar />
      <HomeHeroSection />
      <HomePopularProducts />
      <HomeExploreMoreSection />
      <HomeAboutSection />
      <CommonFooter />
    </main>
  );
}
