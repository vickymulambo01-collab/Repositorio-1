import { Link } from 'react-router-dom'

interface CTASectionProps {
  title: string
  description?: string
  buttonLabel: string
  buttonTo: string
}

export function CTASection({ title, description, buttonLabel, buttonTo }: CTASectionProps) {
  return (
    <section className="bg-brand-800">
      <div className="container-page flex flex-col items-center gap-6 py-20 text-center">
        <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && <p className="max-w-xl text-base leading-relaxed text-white/70">{description}</p>}
        <Link
          to={buttonTo}
          className="mt-2 inline-flex items-center justify-center rounded-sm bg-white px-8 py-3.5 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
