import { useState, type FormEvent } from 'react'
import { categories } from '@/data/products'

interface ContactFormProps {
  initialCategory?: string
  initialMessage?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ initialCategory = '', initialMessage = '' }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      category: String(data.get('category') ?? ''),
      message: String(data.get('message') ?? ''),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Something went wrong. Please try again.')
      }

      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="card-surface bg-white p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-tint text-brand-600">
          <span aria-hidden="true" className="text-xl">✓</span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">Thank you for reaching out</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We have received your enquiry and will get back to you shortly.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary-sm mt-6">
          Send another enquiry
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-colors focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100'

  return (
    <form onSubmit={handleSubmit} className="card-surface bg-white p-8 sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required inputClass={inputClass} />
        <Field label="Company" name="company" required inputClass={inputClass} />
        <Field label="Email" name="email" type="email" required inputClass={inputClass} />
        <Field label="Phone" name="phone" type="tel" inputClass={inputClass} />

        <div className="sm:col-span-2">
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
            Product / Category
          </label>
          <select id="category" name="category" defaultValue={initialCategory} className={inputClass}>
            <option value="">Select a category (optional)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            defaultValue={initialMessage}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {status === 'error' && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-6 disabled:opacity-60">
        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  inputClass,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  inputClass: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
    </div>
  )
}
