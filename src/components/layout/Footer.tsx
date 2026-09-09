import { Link } from 'react-router-dom'
import { categories } from '@/data/products'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-page grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo-rim.png" alt="RIM Trading & Indústria" className="h-8 w-auto invert" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold text-white">RIM</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                Trading &amp; Indústria
              </span>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
            Paper and hygiene products for hospitality, food service, corporate and industrial
            clients.
          </p>
          <address className="mt-5 not-italic">
            <a
              href="https://maps.app.goo.gl/bNCFGNA3Wn/mX47?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              Av. Eduardo Mondlane no 488
            </a>
          </address>
          <p className="mt-2 text-sm text-white/50">
            <a href="tel:+258847776666" className="transition-colors hover:text-white">
              84 777 6666
            </a>
            <span className="mx-2 text-white/30">|</span>
            <a href="tel:+258843466666" className="transition-colors hover:text-white">
              84 346 6666
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Company
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
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
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Products
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
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
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
            Work with RIM
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-white/55">
            Looking for a reliable paper and hygiene supply partner for your business?
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5"
          >
            Send an Enquiry
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/35 sm:flex-row">
          <span>© {year} RIM Trading &amp; Indústria, Lda. All rights reserved.</span>
          <span>Paper &amp; Hygiene Solutions</span>
        </div>
      </div>
    </footer>
  )
}
