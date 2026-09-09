import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '@/components/ContactForm'
import { PageIntro } from '@/components/PageIntro'
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

      <PageIntro
        eyebrow="Contact"
        title="Let's Work Together"
        description="Tell us about your business and what you need. Whether you are a distributor, supermarket, hotel, restaurant or business, we are ready to hear from you."
      />

      <section className="py-24">
        <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">Send an Enquiry</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Fill in the form and a member of our team will get back to you.
            </p>

            <div className="mt-10 rounded-2xl border border-brand-100 bg-tint p-6">
              <h3 className="font-display text-base font-semibold text-ink">Request Our Catalogue</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Ask us for our full product catalogue using the form, and mention it in your
                message — we will send it over.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-base font-semibold text-ink">Our Details</h3>
              <address className="mt-3 not-italic">
                <a
                  href="https://maps.app.goo.gl/bNCFGNA3Wn/mX47?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                >
                  Av. Eduardo Mondlane no 488
                </a>
              </address>
              <p className="mt-2 text-sm text-ink-soft">
                <a href="tel:+258847776666" className="transition-colors hover:text-brand-600">
                  84 777 6666
                </a>
                <span className="mx-2 text-line">|</span>
                <a href="tel:+258843466666" className="transition-colors hover:text-brand-600">
                  84 346 6666
                </a>
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
