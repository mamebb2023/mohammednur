import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home.tsx";
import About from "@/pages/about.tsx";
import Projects from "@/pages/projects.tsx";
import Contact from "@/pages/contact.tsx";
import LandingLayout from "@/components/layout/LandingLayout.tsx";
import InitialLoader from "@/components/layout/InitialLoader.tsx";

function App() {
  return (
    <BrowserRouter>
      <InitialLoader>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </InitialLoader>
    </BrowserRouter>
  );
}

export default App;
