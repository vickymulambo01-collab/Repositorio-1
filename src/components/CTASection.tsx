import { Link } from 'react-router-dom'

interface CTASectionProps {
  title: string
  description?: string
  buttonLabel: string
  buttonTo: string
}

export function CTASection({ title, description, buttonLabel, buttonTo }: CTASectionProps) {
  return (
    <section className="container-page py-20">
      <div className="rounded-3xl bg-tint px-8 py-14 text-center lg:px-16">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-ink-soft">{description}</p>
        )}
        <div className="mt-8">
          <Link to={buttonTo} className="btn-primary">
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
