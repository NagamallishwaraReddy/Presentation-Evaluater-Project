import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fafcfb]">
      <Sidebar />
      <Navbar />
      <main className="ml-[250px] pt-[99px] xl:ml-[291px]">
        <Outlet />
      </main>
    </div>
  );
}