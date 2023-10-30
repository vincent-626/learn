import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen max-w-[1640px]">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
