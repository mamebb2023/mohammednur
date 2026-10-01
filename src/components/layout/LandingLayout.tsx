import { Outlet } from "react-router-dom";

export default function LandingLayout() {
  return (
    <main className="overflow-x-hidden">
      <Outlet />
    </main>
  );
}
