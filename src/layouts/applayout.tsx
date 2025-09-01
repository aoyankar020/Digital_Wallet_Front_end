import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import type { ILayoutProps } from "@/types";

function AppLayout({ children }: ILayoutProps) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <div className=" grow">{children}</div>
      <Footer />
    </div>
  );
}

export default AppLayout;
