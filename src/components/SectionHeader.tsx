interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-soft">{description}</p>}
    </div>
  )
}
