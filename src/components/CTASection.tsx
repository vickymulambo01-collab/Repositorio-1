import { Link } from 'react-router-dom'

interface CTASectionProps {
  title: string
  description?: string
  buttonLabel: string
  buttonTo: string
}

export function CTASection({ title, description, buttonLabel, buttonTo }: CTASectionProps) {
  return (
    <section className="py-24">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-tint px-8 py-16 text-center sm:px-16 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-6">
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="max-w-xl text-base leading-relaxed text-ink-soft">{description}</p>
            )}
            <Link to={buttonTo} className="btn-primary mt-2">
              {buttonLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
