import { Router } from 'express'
import { readEnquiries } from '../data/enquiries'

export const enquiriesRouter = Router()

// Internal/admin listing — gated behind a shared secret until a real admin
// area and authentication exist. Set ADMIN_KEY to enable; unset keeps the
// route closed by default.
enquiriesRouter.get('/', (req, res) => {
  const adminKey = process.env.ADMIN_KEY
  if (!adminKey || req.header('x-admin-key') !== adminKey) {
    res.status(404).end()
    return
  }
  res.json(readEnquiries())
})
