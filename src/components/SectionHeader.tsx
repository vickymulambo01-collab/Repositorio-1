interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div className={`max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${invert ? '!text-brand-200' : ''}`}>{eyebrow}</p>
      )}
      <h2
        className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${invert ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed ${invert ? 'text-white/70' : 'text-ink-soft'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}
