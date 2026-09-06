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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group relative py-2 text-sm font-medium tracking-wide transition-colors ${
      isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
    }`

  const underline = (isActive: boolean) =>
    `pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-600 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
      isActive ? 'scale-x-100' : ''
    }`

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_0_rgba(16,24,40,0.06),0_8px_24px_-20px_rgba(16,24,40,0.25)]' : ''
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3" aria-label="RIM Trading & Indústria home">
          <img src="/logo-rim.png" alt="RIM Trading & Indústria" className="h-8 w-auto" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-ink">RIM</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-soft">
              Trading &amp; Indústria
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  <span className={underline(isActive)} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <NavLink to="/contact" className="btn-primary-sm">
            Get in Touch
          </NavLink>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper-dim md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 rounded-full bg-ink transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`h-0.5 w-5 rounded-full bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-5 rounded-full bg-ink transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <nav className="overflow-hidden border-t border-line bg-white" aria-label="Mobile">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-medium ${
                    isActive ? 'bg-tint text-brand-700' : 'text-ink-soft'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-2">
              Get in Touch
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
