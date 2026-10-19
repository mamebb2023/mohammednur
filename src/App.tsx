import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialLoader from "@/layout/InitialLoader";
import MainLayout from "@/layout/MainLayout";
import DemoFrame from "@/layout/DemoFrame";

import Home from "@/pages/home";
import NotFound from "@/pages/NotFound";
import ProjectsPage from "@/components/projects/page";
import Nova from "@/components/projects/nova/page";
import Nexus from "@/components/projects/nexus/page";
import Lumino from "@/components/projects/lumino/page";
import Unleash from "@/components/projects/unleash/page";

function App() {
  return (
    <BrowserRouter>
      <InitialLoader>
        <Routes>
          {/* the hero explorations are full-bleed, so they live outside MainLayout */}
          <Route element={<DemoFrame />}>
            <Route path="/projects/nova" element={<Nova />} />
            <Route path="/projects/nexus" element={<Nexus />} />
            <Route path="/projects/lumino" element={<Lumino />} />
            <Route path="/projects/unleash" element={<Unleash />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </InitialLoader>
    </BrowserRouter>
  );
}

export default App;
