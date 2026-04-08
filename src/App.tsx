import { Routes, Route } from "react-router-dom"
import Configurator from "./pages/Configurator"
import Community from "./pages/Community"
import Print from "./pages/Print"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Configurator />} />
      <Route path="/community" element={<Community />} />
      <Route path="/print" element={<Print />} />
    </Routes>
  )
}

export default App