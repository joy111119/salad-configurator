import { Routes, Route } from "react-router-dom";
import Configurator from "./pages/Configurator";
import About from "./pages/About";
import Community from "./pages/Community";
import Print from "./pages/Print";
import Header from "./components/Header";
import Footer from "./components/Footer";
import IngredientCard from "./components/IngredientCard"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Configurator />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
