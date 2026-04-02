import { Routes, Route } from 'react-router-dom'
import Configurator from './pages/Configurator'
import About from './pages/About'
import Community from './pages/Community'
import Print from './pages/Print'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Configurator />} />
      <Route path="/about" element={<About />} />
      <Route path="/community" element={<Community />} />
      <Route path="/print" element={<Print />} />
    </Routes>
  )
}

export default App
