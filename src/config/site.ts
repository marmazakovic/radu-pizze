/** Konfiguracija picerije — lako za ažuriranje */
export const SITE = {
  name: 'Radu Pizze',
  address: 'Ćirpanova 2, Novi Sad',
  deliveryFee: 400,
  /** Minimalna porudžbina za dostavu (RSD). Postavi na 0 ako nema minimuma. */
  minOrderDelivery: 800,
  /** Opis zone dostave */
  deliveryZone: 'Dostava u Novom Sadu i okolini. Tačnu zonu proveri telefonom pre porudžbine.',
  phoneDisplay: 'Uskoro',
  url: 'https://marmazakovic.github.io/radu-pizze/',
} as const

export const STORAGE_KEYS = {
  loadingSeen: 'radu-pizze-loading-seen',
  cookieConsent: 'radu-pizze-cookie-consent',
} as const
