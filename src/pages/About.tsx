import { CTASection } from '@/components/CTASection'
import { PageIntro } from '@/components/PageIntro'
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

      <PageIntro eyebrow="About RIM" title="RIM Trading & Indústria, Lda" />

      <section className="py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What We Do" title="Our Activity" />
            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              RIM Trading &amp; Indústria, Lda works across a range of products related to hygiene,
              paper and tissue, supplying items designed for professional use, restaurant and
              take-away operations, office environments and industrial cleaning.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              RIM Trading &amp; Indústria has been operating since 1997.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
              Areas of Activity
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ACTIVITY_AREAS.map((area) => (
                <li
                  key={area}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-4 py-3.5 text-sm text-ink"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
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
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map((item, i) => (
              <div key={item.title} className="card-surface card-surface-hover bg-white p-7">
                <span className="font-display text-2xl font-bold text-brand-200">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{item.title}</h3>
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
