import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '@/components/ContactForm'
import { Seo } from '@/components/Seo'
import { getProductById } from '@/data/products'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('product')
  const product = productId ? getProductById(productId) : undefined

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with RIM Trading & Indústria, Lda for product information, quotations and business enquiries."
        path="/contact"
      />

      <section className="bg-ink py-20">
        <div className="container-page">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">Contact</p>
          <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s Work Together
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Tell us about your business and what you need. Whether you are a distributor,
            supermarket, hotel, restaurant or business, we are ready to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Send an Enquiry</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Fill in the form and a member of our team will get back to you.
            </p>

            <div className="mt-10 border border-line bg-white p-6">
              <h3 className="font-display text-base font-semibold text-ink">Request Our Catalogue</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Ask us for our full product catalogue using the form, and mention it in your
                message — we will send it over.
              </p>
            </div>
          </div>

          <ContactForm
            initialCategory={product?.category}
            initialMessage={product ? `I would like more information about ${product.name}.` : ''}
          />
        </div>
      </section>
    </>
  )
}
