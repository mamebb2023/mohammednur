import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/landing/home.tsx'
import About from './components/landing/about.tsx'
import Projects from './components/landing/projects.tsx'
import Contact from './components/landing/contact.tsx'
import LandingLayout from './components/layout/LandingLayout.tsx'
import InitialLoader from './components/layout/InitialLoader.tsx'

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
  )
}

export default App