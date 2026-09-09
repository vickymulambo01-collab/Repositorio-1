import { Check } from 'lucide-react'
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
      <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-xl lg:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tint">
          <Check className="h-6 w-6 text-brand-600" />
        </div>
        <h3 className="mt-6 font-display text-xl font-extrabold text-ink">Thank you for reaching out</h3>
        <p className="mt-2 text-sm text-ink-soft">
          We have received your enquiry and will get back to you shortly.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary-sm mt-6">
          Send another enquiry
        </button>
      </div>
    )
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-400'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 shadow-xl lg:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required inputClass={inputClass} />
        <Field label="Company" name="company" required inputClass={inputClass} />
        <Field label="Email" name="email" type="email" required inputClass={inputClass} />
        <Field label="Phone" name="phone" type="tel" inputClass={inputClass} />

        <div className="sm:col-span-2">
          <label htmlFor="category" className="block text-sm font-medium text-ink">
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
          <label htmlFor="message" className="block text-sm font-medium text-ink">
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
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
    </div>
  )
}
