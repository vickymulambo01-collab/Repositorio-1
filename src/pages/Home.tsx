import { useState } from 'react'
import { CategoryCard } from '@/components/CategoryCard'
import { CTASection } from '@/components/CTASection'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductModal } from '@/components/ProductModal'
import { Seo } from '@/components/Seo'
import { SectionHeader } from '@/components/SectionHeader'
import { categories, getFeaturedProducts } from '@/data/products'
import type { Product } from '@/types'

const HOMEPAGE_CATEGORIES = [
  categories.find((c) => c.id === 'napkins')!,
  categories.find((c) => c.id === 'facial-tissue')!,
  categories.find((c) => c.id === 'toilet-paper')!,
  categories.find((c) => c.id === 'kitchen-towels')!,
  categories.find((c) => c.id === 'take-away')!,
  {
    id: 'office-industrial',
    name: 'Office & Industrial',
    shortDescription: 'A4 office paper and equipment for industrial and cleaning use.',
    image: '/assets/products/papel-a4.jpeg',
  },
]

const PILLARS = [
  {
    title: 'Consistent Product Quality',
    description:
      'Every product is manufactured to the specifications published in its own listing — ply, sheet count and dimensions you can rely on order after order.',
  },
  {
    title: 'Diverse Product Range',
    description:
      'From napkins and facial tissue to toilet paper, kitchen towels, take-away supplies and office paper, RIM covers a broad set of everyday paper and hygiene needs.',
  },
  {
    title: 'Solutions for Professional Use',
    description:
      'Our range is built around real commercial use cases — hospitality, food service, offices and industrial environments.',
  },
  {
    title: 'Reliable Business Partnership',
    description:
      'We work directly with distributors, supermarkets, hotels, restaurants and businesses to support their ongoing paper and hygiene supply needs.',
  },
]

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      <Seo
        title="Quality Paper & Hygiene Solutions"
        description="RIM Trading & Indústria, Lda supplies napkins, tissue, toilet paper, kitchen towels, take-away and office paper products for hospitality, food service, corporate and industrial clients."
        path="/"
      />

      <Hero />

      <section className="py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Range"
            title="Product Categories"
            description="Explore our range of paper and hygiene products, organised by category."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HOMEPAGE_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-24">
        <div className="container-page">
          <SectionHeader eyebrow="Why RIM" title="Built for Professional Supply Needs" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <div key={pillar.title} className="border-t-2 border-brand-600 pt-5">
                <span className="text-xs font-semibold text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Featured"
              title="Featured Products"
              description="A selection of products from our catalogue."
            />
          </div>
          <div className="mt-12">
            <ProductGrid products={featuredProducts} onSelect={setSelectedProduct} />
          </div>
        </div>
      </section>

      <CTASection
        title="Looking for a reliable paper and hygiene supply partner?"
        description="Tell us about your business and the products you need — our team will follow up with the right information."
        buttonLabel="Get in Touch"
        buttonTo="/contact"
      />

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
