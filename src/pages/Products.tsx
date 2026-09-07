import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageIntro } from '@/components/PageIntro'
import { ProductGrid } from '@/components/ProductGrid'
import { ProductModal } from '@/components/ProductModal'
import { Seo } from '@/components/Seo'
import { SectionHeader } from '@/components/SectionHeader'
import { categories, expandCategoryFilter, products } from '@/data/products'
import type { Product } from '@/types'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const activeCategory = searchParams.get('category') ?? 'all'

  const setActiveCategory = (categoryId: string) => {
    if (categoryId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId })
    }
  }

  const filteredProducts = useMemo(() => {
    const categoryIds = activeCategory === 'all' ? null : expandCategoryFilter(activeCategory)
    const normalizedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory = !categoryIds || categoryIds.includes(product.category)
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <>
      <Seo
        title="Products"
        description="Browse the full RIM Trading & Indústria catalogue: napkins, take-away, facial tissue, toilet paper, kitchen towels, office paper and industrial cleaning products."
        path="/products"
      />

      <PageIntro
        eyebrow="Catalogue"
        title="Our Products"
        description="Browse our range by category, or search for a specific product. Contact us for detailed information or a quotation."
      />

      <section className="py-16">
        <div className="container-page">
          <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <CategoryPill
                label="All Products"
                active={activeCategory === 'all'}
                onClick={() => setActiveCategory('all')}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  label={cat.name}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full rounded-full border border-line bg-white py-2.5 pl-11 pr-4 text-sm text-ink transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              />
            </div>
          </div>

          <div className="mt-10">
            <SectionHeader
              title={
                activeCategory === 'all'
                  ? 'All Products'
                  : (categories.find((c) => c.id === activeCategory)?.name ?? 'All Products')
              }
              description={`${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`}
            />
            <div className="mt-8">
              <ProductGrid products={filteredProducts} onSelect={setSelectedProduct} />
            </div>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? 'border-brand-600 bg-brand-600 text-white shadow-[0_6px_16px_-8px_rgba(37,84,184,0.6)]'
          : 'border-line bg-white text-ink-soft hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      {label}
    </button>
  )
}
