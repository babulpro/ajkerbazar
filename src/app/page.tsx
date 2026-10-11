import Category from "@/components/Category";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import ProductMarquee from "@/components/ProductMarquee";

 

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl py-20">
      <Hero/>
      <Product/>
     
      <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea a autem voluptas minima temporibus esse ad earum, unde ipsa vitae soluta ducimus minus eaque, molestiae accusantium ullam. Itaque, molestias ipsa?</h1>
      <h1 className="mt-96"> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, recusandae a praesentium possimus accusantium, temporibus atque eum dolorem explicabo mollitia quod numquam quas. Magni nostrum optio porro eum nesciunt iusto.</h1>
      
    </main>
  );
}