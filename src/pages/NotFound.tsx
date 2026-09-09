import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex
      />

      <section className="relative overflow-hidden bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand-100/70 blur-3xl"
        />
        <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/" className="btn-primary">
              Back to Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
