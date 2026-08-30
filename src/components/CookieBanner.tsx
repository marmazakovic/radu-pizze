import { useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../config/site'
import './CookieBanner.css'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEYS.cookieConsent)
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEYS.cookieConsent, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Obaveštenje o kolačićima">
      <p>
        Koristimo lokalno skladište za osnovno funkcionisanje sajta (uvodna animacija,
        podešavanja). Nema reklamnih kolačića.{' '}
        <a href="#politika-privatnosti">Više u politici privatnosti</a>.
      </p>
      <button type="button" className="btn btn-primary cookie-banner__btn" onClick={accept}>
        Razumem
      </button>
    </div>
  )
}
