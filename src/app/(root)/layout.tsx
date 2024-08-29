import Header from "@/components/layout/Header";



export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header></Header>
      <div className='flex-1 container pb-10'>{children}</div>
    </div>
  );



}
