import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div>
      <div className="min-h-screen max-w-[1640px]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
