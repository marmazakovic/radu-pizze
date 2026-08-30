/** Srpski mobilni broj: 06xxxxxxxx (8–9 cifara posle 06) */
const PHONE_RE = /^0?6[0-9]{7,9}$/

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-/]/g, '')
}

export function isValidPhone(raw: string): boolean {
  const n = normalizePhone(raw)
  return PHONE_RE.test(n)
}

export function formatPhoneHint(): string {
  return '061 234 5678'
}
