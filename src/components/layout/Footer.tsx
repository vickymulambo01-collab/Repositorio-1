import { Link } from 'react-router-dom'
import { categories } from '@/data/products'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink text-white/80">
      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <img src="/logo-rim.png" alt="RIM Trading & Indústria" className="h-9 w-auto invert" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-white">RIM</span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                Trading &amp; Indústria
              </span>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Paper and hygiene products for hospitality, food service, corporate and industrial
            clients.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Company
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/about" className="text-white/60 transition-colors hover:text-white">
                About RIM
              </Link>
            </li>
            <li>
              <Link to="/solutions" className="text-white/60 transition-colors hover:text-white">
                Quality &amp; Solutions
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/60 transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Products
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/products?category=${cat.id}`}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Work with RIM
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-white/60">
            Looking for a reliable paper and hygiene supply partner for your business?
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center rounded-sm border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Send an Enquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 sm:flex-row">
          <span>© {year} RIM Trading &amp; Indústria, Lda. All rights reserved.</span>
          <span>Paper &amp; Hygiene Solutions</span>
        </div>
      </div>
    </footer>
  )
}
