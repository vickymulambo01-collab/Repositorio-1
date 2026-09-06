import { Link } from 'react-router-dom'
import { CTASection } from '@/components/CTASection'
import { Seo } from '@/components/Seo'
import { SectionHeader } from '@/components/SectionHeader'

const SEGMENTS = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    description:
      'Products for hotels, restaurants, cafés and other hospitality spaces, including napkins, facial tissue and toilet paper suited to daily guest-facing use.',
    categories: ['napkins', 'facial-tissue', 'toilet-paper'],
    image: '/assets/products/nice-classic-100.png',
  },
  {
    id: 'food-service',
    title: 'Food Service & Take Away',
    description:
      'Napkin and paper products for take-away and food-service operations, including our dedicated Serviette Take Away range.',
    categories: ['take-away', 'napkins'],
    image: '/assets/products/serviette-takeaway-2ply.jpeg',
  },
  {
    id: 'commercial',
    title: 'Commercial & Corporate',
    description:
      'Tissue, toilet paper and A4 office paper for businesses and corporate environments.',
    categories: ['facial-tissue', 'toilet-paper', 'office-paper'],
    image: '/assets/products/papel-a4.jpeg',
  },
  {
    id: 'industrial',
    title: 'Industrial & Cleaning',
    description: 'Products for professional and industrial cleaning environments.',
    categories: ['industrial-cleaning'],
    image: '/assets/products/vassoura-industrial-superpro.jpeg',
  },
]

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="RIM Trading & Indústria applications across hospitality, food service, commercial and industrial segments."
        path="/solutions"
      />

      <section className="bg-ink py-20">
        <div className="container-page">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            Quality &amp; Solutions
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Solutions for Professional Use
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Our products serve a range of professional and commercial segments. Below is an
            overview of where our range applies.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page flex flex-col gap-20">
          {SEGMENTS.map((segment, i) => (
            <div
              key={segment.id}
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-paper-dim p-10">
                <img
                  src={segment.image}
                  alt={segment.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xs font-semibold text-brand-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {segment.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{segment.description}</p>
                <Link
                  to={`/products?category=${segment.categories[0]}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  View related products
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Commitment"
            title="Quality You Can Rely On"
            description="Each product is supplied to the specifications listed in our catalogue — ply, sheet count, dimensions and packaging — so you know exactly what you are ordering."
          />
        </div>
      </section>

      <CTASection
        title="Not sure which product fits your operation?"
        description="Send us details about your business and we will help you find the right products."
        buttonLabel="Contact Us"
        buttonTo="/contact"
      />
    </>
  )
}
