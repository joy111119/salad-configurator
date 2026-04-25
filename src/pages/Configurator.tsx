import { useState, useEffect } from 'react'
import BaseSelection from '../components/BaseSelection'
import BowlSelection from '../components/BowlSelection'
import CenterBowl from '../components/CenterBowl'
import IngredientSection from '../components/IngredientSection'
import SummaryBar from '../components/SummaryBar'
import Modal from '../components/Modal' 
import { useIngredientStore } from '../store/useIngredientStore'

import type { Bowl, Category, Ingredient } from '../types/index'
import { getBowls, getCategories, getIngredients, getBaseIngredients } from '../services/api'

function Configurator() {
  const [bowls, setBowls] = useState<Bowl[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [bases, setBases] = useState<Ingredient[]>([])

  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false) 

  const baseType = useIngredientStore((s) => s.baseType)

  useEffect(() => {
    async function loadData() {
      try {
        const [b, c, i, bi] = await Promise.all([
          getBowls(baseType),
          getCategories(baseType),
          getIngredients(),
          getBaseIngredients()
        ])

        setBowls(b)
        setCategories(c)
        setIngredients(i)
        setBases(bi)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [baseType])

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 flex flex-col gap-6 text-white">

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Open Modal
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        <BowlSelection bowls={bowls} />
        <CenterBowl />
        <BaseSelection bases={bases} />
      </div>

      <IngredientSection
        ingredients={ingredients}
        categories={categories}
      />

      <SummaryBar />

      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-black">
          Hello Modal 
        </div>
      </Modal>

    </div>
  )
}

export default Configurator