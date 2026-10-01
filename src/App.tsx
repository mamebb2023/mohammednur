import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/landing/home.tsx'
import LandingLayout from './components/layout/LandingLayout.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App