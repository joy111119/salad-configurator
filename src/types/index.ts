// BaseType interface
export interface BaseType {
  id: number
  name: string
  price?: number
  image_url: string
  barcode_url: string
}

// Bowl interface extending BaseType
export interface Bowl extends BaseType {
  base_type_id?: number
  volume?: number
  slot_count: number
  shape: 'round' | 'square'
}

export interface PriceListItem {
  id: number
  item_id: number
  price: number
  type?: string
}