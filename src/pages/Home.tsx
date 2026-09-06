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
    image: '/assets/products/papel-a4.jpg',
  },
]

const PILLARS = [
  {
    title: 'Consistent Product Quality',
    description:
      'Every product is manufactured to the specifications published in its own listing — ply, sheet count and dimensions you can rely on order after order.',
    icon: (
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z M9.5 12l1.8 1.8L15 10"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Diverse Product Range',
    description:
      'From napkins and facial tissue to toilet paper, kitchen towels, take-away supplies and office paper, RIM covers a broad set of everyday paper and hygiene needs.',
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" strokeWidth="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: 'Solutions for Professional Use',
    description:
      'Our range is built around real commercial use cases — hospitality, food service, offices and industrial environments.',
    icon: (
      <>
        <rect x="3.5" y="7.5" width="17" height="12" rx="1.8" strokeWidth="1.6" />
        <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: 'Reliable Business Partnership',
    description:
      'We work directly with distributors, supermarkets, hotels, restaurants and businesses to support their ongoing paper and hygiene supply needs.',
    icon: (
      <path
        d="M8 12l2.3 2.3L16 8.5 M4 6.5h5l1.6 2h4.8l1.6-2h3"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
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
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="card-surface card-surface-hover bg-white p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tint text-brand-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6">
                    {pillar.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
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
