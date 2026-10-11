import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import ProductMarquee from "@/components/ProductMarquee";

 

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl py-10">
      <Hero/>
      <Product/>
      <Footer/>      
      
    </main>
  );
}