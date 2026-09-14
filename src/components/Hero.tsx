import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand-100 opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-40 h-72 w-72 rounded-full bg-tint opacity-80 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div className="relative">
          <p className="eyebrow">RIM Trading &amp; Indústria, Lda</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-ink lg:text-6xl">
            Quality Paper &amp; Hygiene Solutions
          </h1>
          <p className="mt-6 max-w-xl text-base text-ink-soft lg:text-lg">
            RIM Trading &amp; Indústria supplies napkins, tissue, toilet paper, kitchen towels,
            take-away and office paper products for hospitality, food service, corporate and
            industrial clients.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative h-[420px]">
          <img
            src="/assets/products/nice-classic-100.jpg"
            alt="Nice Classic napkins"
            className="absolute left-0 top-6 h-56 w-56 -rotate-6 rounded-2xl border border-line object-cover shadow-2xl lg:h-64 lg:w-64"
          />
          <img
            src="/assets/products/facial-nice-150.jpg"
            alt="Facial Nice tissue"
            className="absolute right-4 top-0 h-52 w-52 rotate-3 rounded-2xl border border-line object-cover shadow-2xl lg:h-60 lg:w-60"
          />
          <img
            src="/assets/products/toalha-cozinha-nice.jpg"
            alt="Nice kitchen towel"
            className="absolute bottom-0 right-16 h-56 w-56 -rotate-3 rounded-2xl border border-line object-cover shadow-2xl lg:h-64 lg:w-64"
          />
        </div>
      </div>
    </section>
  )
}
