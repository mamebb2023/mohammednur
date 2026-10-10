import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home.tsx";
import MainLayout from "@/layout/MainLayout.tsx";
import NotFound from "./pages/NotFound";
import InitialLoader from "./layout/InitialLoader";

function App() {
  return (
    <BrowserRouter>
      <InitialLoader>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </InitialLoader>
    </BrowserRouter>
  );
}

export default App;
