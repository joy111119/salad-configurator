import BaseSelection from '../components/BaseSelection'
import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import IngredientSection from '../components/IngredientSection'
import SummaryBar from '../components/SummaryBar'

function Configurator() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        <BowlSelection />
        <CenterBowl />
        <BaseSelection />
      </div>

      <IngredientSection />
      <SummaryBar />
    </div>
  )
}

export default Configurator
