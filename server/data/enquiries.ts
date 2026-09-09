import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import type { ContactEnquiry } from '../../src/types'

export interface StoredEnquiry extends ContactEnquiry {
  id: string
  receivedAt: string
}

const dataDir = path.dirname(fileURLToPath(import.meta.url))
const enquiriesFile = path.join(dataDir, 'enquiries.json')

function ensureFile() {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  if (!existsSync(enquiriesFile)) writeFileSync(enquiriesFile, '[]', 'utf-8')
}

export function readEnquiries(): StoredEnquiry[] {
  ensureFile()
  return JSON.parse(readFileSync(enquiriesFile, 'utf-8'))
}

export function addEnquiry(enquiry: ContactEnquiry): StoredEnquiry {
  const stored: StoredEnquiry = {
    ...enquiry,
    id: `enq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
  }

  const enquiries = readEnquiries()
  enquiries.push(stored)
  writeFileSync(enquiriesFile, JSON.stringify(enquiries, null, 2), 'utf-8')
  return stored
}
