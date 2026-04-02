import { useState } from 'react'
import BaseSelection from '../components/BaseSelection'
import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import IngredientSection from '../components/IngredientSection'
import SummaryBar from '../components/SummaryBar'

import { Bowl, Category, Ingredient } from '../types/salad'

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

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
