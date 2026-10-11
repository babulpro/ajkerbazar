import Link from "next/link";

export default function Footer() {
 

  return (
    <footer className="mt-16 w-full">
     
      <div className="border-t border-separator bg-default-50/50">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-6 py-3 text-xs text-default-500 sm:flex-row sm:items-center sm:text-sm">
          
          <p className="font-medium text-foreground">
            বাজার দর —{" "}
            <span className="font-normal text-default-500">
              প্রতিদিনের বাজারদর দাম এক নজরে।
            </span>
          </p>

         
          <p className="text-default-500">
            সকল দাম সাপ্তাহিক; বাজার অনুযায়ী এগুলো ভিন্ন হতে পারে
          </p>
        </div>
      </div>

     
       
    </footer>
  );
}