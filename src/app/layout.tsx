import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNavbar from "@/components/navbar/topNavbar";
import { getCategories } from "@/lib/bazardor";
import { CategoryProvider } from "@/context/CategoryContext";
import Category from "@/components/Category";
import ProductMarquee from "@/components/ProductMarquee";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily | Bazar Dor  ",
  description: "Daily Bazr Dor is a platform for daily deals and offers. Find the best discounts and promotions on a wide range of products and services.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
 
  const categories = await getCategories(); // Fetch categories from the API

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
       <CategoryProvider categories={categories}>
         <header>
          
          <TopNavbar/>
          <Category/>
          <ProductMarquee/>
          
        </header>
        <main className="pt-24">
          
          {children}  
        </main>
       </CategoryProvider>
        
        </body>
    </html>
  );
}
