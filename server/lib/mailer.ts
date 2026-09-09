import nodemailer from 'nodemailer'
import type { StoredEnquiry } from '../data/enquiries'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, NOTIFY_EMAIL } = process.env

const isConfigured = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && NOTIFY_EMAIL)

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : undefined

if (!isConfigured) {
  console.warn(
    '[mailer] SMTP not configured (SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/NOTIFY_EMAIL) — ' +
      'enquiries will be saved but no email notification will be sent. See .env.example.',
  )
}

/**
 * Fire-and-forget: enquiries are already persisted to disk by the caller before this
 * runs, so a failed or unconfigured send must never surface as a 500 to the visitor.
 */
export async function notifyNewEnquiry(enquiry: StoredEnquiry): Promise<void> {
  if (!transporter || !NOTIFY_EMAIL) return

  const lines = [
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company}`,
    `Email: ${enquiry.email}`,
    enquiry.phone && `Phone: ${enquiry.phone}`,
    enquiry.category && `Category: ${enquiry.category}`,
    '',
    'Message:',
    enquiry.message,
    '',
    `Enquiry ID: ${enquiry.id}`,
    `Received: ${enquiry.receivedAt}`,
  ].filter((line): line is string => Boolean(line))

  try {
    await transporter.sendMail({
      from: SMTP_FROM || SMTP_USER,
      to: NOTIFY_EMAIL,
      replyTo: enquiry.email,
      subject: `New enquiry from ${enquiry.company} (${enquiry.name})`,
      text: lines.join('\n'),
    })
  } catch (err) {
    console.error('[mailer] Failed to send enquiry notification email:', err)
  }
}
