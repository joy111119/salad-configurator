import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculations'

describe('calculateTotal', () => {
  it('should return the total weight of ingredients', () => {
    const mockIngredients = [
      { name: 'Tomato', weight: 50 },
      { name: 'Cucumber', weight: 100 }
    ]

    const result = calculateTotal(mockIngredients)

    expect(result).toBe(150)
  })
})