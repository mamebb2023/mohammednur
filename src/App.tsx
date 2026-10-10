import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home.tsx";
import MainLayout from "@/layout/MainLayout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
