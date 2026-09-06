export type Ply = '1-Ply' | '2-Ply' | '3-Ply'

export interface Product {
  id: string
  name: string
  category: string
  brand: string
  ply: Ply | null
  sheets: number | null
  dimensions?: string
  packaging: string
  barcode: string | null
  description: string
  image: string
  featured: boolean
}

export interface Category {
  id: string
  name: string
  shortDescription: string
  image: string
}

export interface ContactEnquiry {
  name: string
  company: string
  email: string
  phone?: string
  category?: string
  message: string
}
