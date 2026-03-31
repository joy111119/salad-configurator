import Header from './components/Header'
import BaseSelection from './components/BaseSelection'
import BowlSelection from './components/BowlSelection'
import Footer from './components/Footer'
import  CenterBowl  from './components/CenterBowl'
import CenterBowl from './components/CenterBowl'
import IngredientSection from './components/IngredientSection'
import SummaryBar from './components/SummaryBar'

function App() {
  return (
    <div className="p-6 min-h-screen flex flex-col">
      <Header />

      {/* Main Layout */}
      <main className="flex flex-1 items-center justify-between gap-6">
        
        {/* Left */}
      

      
      <main className="flex flex-1 items-center justify-between gap-6">
        
        
        <div className="flex-1">
          <BowlSelection />
        </div>

        {/* Center */}
        <CenterBowl />

        {/* Right */}
        
        <CenterBowl />

        
        <div className="flex-1 flex justify-end">
          <BaseSelection />
        </div>

      </main>

      <IngredientSection />
      <SummaryBar></SummaryBar>
      <Footer />
    </div>
  )
}

export default App