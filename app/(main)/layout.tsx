import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1  bg-background">{children}</main>
      <Footer />
    </div>
  );
}
