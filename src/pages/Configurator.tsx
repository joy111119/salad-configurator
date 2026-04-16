import { useState, useEffect } from 'react'
import BaseSelection from '../components/BaseSelection'
import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import IngredientSection from '../components/IngredientSection'
import SummaryBar from '../components/SummaryBar'
import { useIngredientStore } from '../store/useIngredientStore'


import type { Bowl, Category, Ingredient } from '../types/index'
import { getBowls, getCategories, getIngredients } from '../services/api'

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  const [loading, setLoading] = useState(true)
  const baseType = useIngredientStore((s) => s.baseType)


  useEffect(() => {
    async function loadData() {
      try {
        const [b, c, i] = await Promise.all([
          getBowls(),
          getCategories(),
          getIngredients()
        ])

        setBowls(b)
        setCategories(c)
        setIngredients(i)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 flex flex-col gap-6 text-white">

      <div className="flex flex-col lg:flex-row gap-6">
        <BowlSelection bowls={bowls.filter(b => b.base_type_id === baseType)} />
        <CenterBowl />
        <BaseSelection ingredients={ingredients} />
      </div>

      <IngredientSection
        ingredients={ingredients}
        categories={categories.filter(c => c.base_type_id === baseType)}
      />

      <SummaryBar />
    </div>
  )
}

export default Configurator
