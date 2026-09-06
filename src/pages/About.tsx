import { CTASection } from '@/components/CTASection'
import { Seo } from '@/components/Seo'
import { SectionHeader } from '@/components/SectionHeader'

const ACTIVITY_AREAS = [
  'Hygiene products',
  'Paper products',
  'Tissue products',
  'Products for professional use',
  'Solutions for restaurants and take-away',
  'Office products',
  'Industrial cleaning products',
]

const APPROACH = [
  {
    title: 'Quality',
    description: 'Products manufactured and packed to defined specifications for every item we supply.',
  },
  {
    title: 'Consistency',
    description: 'The same product, ply, sheet count and packaging you expect, order after order.',
  },
  {
    title: 'Variety',
    description: 'A catalogue spanning napkins, tissue, toilet paper, kitchen towels, take-away and office paper.',
  },
  {
    title: 'Professional Needs',
    description: 'A range built to serve hospitality, food service, corporate and industrial customers.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About RIM"
        description="RIM Trading & Indústria, Lda is a company working across paper and hygiene products for professional and commercial use."
        path="/about"
      />

      <section className="bg-ink py-20">
        <div className="container-page">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            About RIM
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            RIM Trading &amp; Indústria, Lda
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What We Do" title="Our Activity" />
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              RIM Trading &amp; Indústria, Lda works across a range of products related to hygiene,
              paper and tissue, supplying items designed for professional use, restaurant and
              take-away operations, office environments and industrial cleaning.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Areas of Activity
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ACTIVITY_AREAS.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2.5 border border-line bg-white px-4 py-3 text-sm text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Our Approach"
            title="How We Work"
            description="Our approach to the business is centred on four principles."
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((item, i) => (
              <div key={item.title} className="border-t-2 border-brand-600 pt-5">
                <span className="text-xs font-semibold text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to know more about our product range?"
        buttonLabel="View Our Products"
        buttonTo="/products"
      />
    </>
  )
}
