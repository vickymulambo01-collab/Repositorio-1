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
      <div className="border border-line bg-white p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-ink">Thank you for reaching out</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We have received your enquiry and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-white p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />

        <div className="sm:col-span-2">
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-ink">
            Product / Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={initialCategory}
            className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none"
          >
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
            className="w-full resize-none rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {status === 'error' && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-6 inline-flex items-center justify-center rounded-sm bg-brand-700 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
      >
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
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-line bg-white px-3.5 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none"
      />
    </div>
  )
}
