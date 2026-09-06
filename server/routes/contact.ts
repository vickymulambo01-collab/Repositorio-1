import { Router } from 'express'
import { addEnquiry } from '../data/enquiries'

export const contactRouter = Router()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD_LENGTH = 2000

function isNonEmptyString(value: unknown, maxLength = MAX_FIELD_LENGTH): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength
}

contactRouter.post('/', (req, res) => {
  const { name, company, email, phone, category, message } = req.body ?? {}

  if (!isNonEmptyString(name, 200) || !isNonEmptyString(company, 200)) {
    res.status(400).json({ error: 'Name and company are required.' })
    return
  }

  if (!isNonEmptyString(email, 200) || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ error: 'A valid email address is required.' })
    return
  }

  if (!isNonEmptyString(message, MAX_FIELD_LENGTH)) {
    res.status(400).json({ error: 'A message is required.' })
    return
  }

  if (phone !== undefined && typeof phone !== 'string') {
    res.status(400).json({ error: 'Invalid phone value.' })
    return
  }

  if (category !== undefined && typeof category !== 'string') {
    res.status(400).json({ error: 'Invalid category value.' })
    return
  }

  const enquiry = addEnquiry({
    name: name.trim(),
    company: company.trim(),
    email: email.trim(),
    phone: typeof phone === 'string' ? phone.trim() : undefined,
    category: typeof category === 'string' ? category.trim() : undefined,
    message: message.trim(),
  })

  res.status(201).json({ id: enquiry.id, receivedAt: enquiry.receivedAt })
})
