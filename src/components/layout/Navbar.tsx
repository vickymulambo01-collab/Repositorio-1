import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-brand-700' : 'text-ink-soft hover:text-brand-700'
    }`

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-line bg-paper/95 backdrop-blur-sm' : 'border-transparent bg-paper'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3" aria-label="RIM Trading & Indústria home">
          <img src="/logo-rim.png" alt="RIM Trading & Indústria" className="h-9 w-auto" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-ink">RIM</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-soft">
              Trading &amp; Indústria
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink
            to="/contact"
            className="inline-flex items-center rounded-sm bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Get in Touch
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-line md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-line bg-paper md:hidden" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-sm px-3 py-3 text-base font-medium ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-soft'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-sm bg-brand-700 px-5 py-3 text-sm font-semibold text-white"
            >
              Get in Touch
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
