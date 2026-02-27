// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PublicLayout from "./layouts/PublicLayout"
import PrivateLayout from "./layouts/PrivateLayout"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import NotFound from "./pages/NotFound"
import PortfolioDark from "./pages/PortfolioPage"
import SWFMConfigViewer from "./pages/SWFMConfigViewer"

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<PortfolioDark />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path='/swfm-diff' element={<SWFMConfigViewer />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
