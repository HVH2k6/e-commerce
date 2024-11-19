import Header from "@/components/layout/Header";
import SidebarProfile from "@/components/layout/SidebarProfile";
import { CartProvider } from "@/context/CartContext";




export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <div className="grid grid-cols-[300px,minmax(0,1fr)] gap-x-5 mt-5">
    <div className="">
        <SidebarProfile></SidebarProfile>
    </div>
    <div className="box-content-page h-max">
        {children}
    </div>
   </div>
  );



}
