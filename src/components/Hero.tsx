import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand-100/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-tint blur-3xl"
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-16 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="eyebrow">RIM Trading &amp; Indústria, Lda</p>
          <h1 className="mt-5 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            Quality Paper &amp; Hygiene Solutions
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            RIM Trading &amp; Indústria supplies napkins, tissue, toilet paper, kitchen towels,
            take-away and office paper products for hospitality, food service, corporate and
            industrial clients.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/products" className="btn-primary">
              Explore Our Products
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem]">
          <div className="card-surface absolute right-0 top-0 flex h-56 w-52 rotate-3 items-center justify-center overflow-hidden p-6 shadow-[0_30px_60px_-24px_rgba(16,24,40,0.22)] sm:h-64 sm:w-60">
            <img
              src="/assets/products/nice-classic-100.jpg"
              alt="Nice Classic napkins"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="card-surface absolute bottom-0 left-0 flex h-52 w-48 -rotate-6 items-center justify-center overflow-hidden bg-tint p-6 shadow-[0_30px_60px_-24px_rgba(16,24,40,0.18)] sm:h-60 sm:w-56">
            <img
              src="/assets/products/facial-nice-150.jpg"
              alt="Facial Nice tissue"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="card-surface absolute bottom-8 right-4 flex h-28 w-28 items-center justify-center overflow-hidden shadow-[0_20px_40px_-20px_rgba(16,24,40,0.2)] sm:h-32 sm:w-32">
            <img
              src="/assets/products/toalha-cozinha-nice.jpg"
              alt="Nice kitchen towel"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
