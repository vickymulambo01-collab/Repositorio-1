import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <img
          src="/assets/products/nice-classic-100.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
      </div>

      <div className="container-page relative flex min-h-[34rem] flex-col justify-center py-24 sm:min-h-[38rem]">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
          RIM Trading &amp; Indústria, Lda
        </p>
        <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Quality Paper &amp; Hygiene Solutions
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          RIM Trading &amp; Indústria supplies napkins, tissue, toilet paper, kitchen towels,
          take-away and office paper products for hospitality, food service, corporate and
          industrial clients.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/products"
            className="inline-flex items-center justify-center rounded-sm bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
          >
            Explore Our Products
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
