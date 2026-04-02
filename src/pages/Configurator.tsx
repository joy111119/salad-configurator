import Header from '../components/Header'
import Footer from '../components/Footer'
import BaseSelection from '../components/BaseSelection'
import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import IngredientSection from '../components/IngredientSection'
import SummaryBar from '../components/SummaryBar'

function Configurator() {
  return (
    <div className="p-6 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col gap-6 mt-6">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
          <BowlSelection />
          <CenterBowl />
          <BaseSelection />
        </div>

        <IngredientSection />
        <SummaryBar />
      </main>

      <Footer />
    </div>
  )
}

export default Configurator
