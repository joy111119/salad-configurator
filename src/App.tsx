import Header from './components/Header'
import BaseSelection from './components/BaseSelection'
import BowlSelection from './components/BowlSelection'
import Footer from './components/Footer'
import CenterBowl from './components/CenterBowl'
import IngredientSection from './components/IngredientSection'
import SummaryBar from './components/SummaryBar'

function App() {
  return (
    <div className="p-6 space-y-6">
      <Header />

      

      
      <main className="flex flex-1 items-center justify-between gap-6">
        
        
        <div className="flex-1">
          <BowlSelection />
        </div>

        
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