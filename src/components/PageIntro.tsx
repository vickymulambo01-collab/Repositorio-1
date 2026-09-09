import type { ReactNode } from 'react'

interface PageIntroProps {
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="border-b border-line bg-tint">
      <div className="container-page py-16 lg:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-ink-soft">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
