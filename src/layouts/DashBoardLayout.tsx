import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export const DashBoardLayout = () => {
  return (
    <div className="h-screen flex bg-background">
      <Sidebar/>
      <main className="flex-1  overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};