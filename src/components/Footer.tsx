import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Logo } from './Logo'
import { PrivacyContent } from './Privacy'
import './Footer.css'

export function Footer() {
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== '#politika-privatnosti') return
      const el = document.getElementById('politika-privatnosti')
      if (el instanceof HTMLDetailsElement) {
        el.open = true
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <footer className="footer" id="footer">
      <div className="italian-stripe" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="container footer__wrap">
        <div className="footer__inner">
          <div className="footer__brand">
            <Logo className="footer__logo" variant="light" />
            <p>Ćirpanova 2, Novi Sad</p>
          </div>
          <p className="footer__tagline">Fatto con amore · pečeno sa strašću</p>
        </div>

        <details className="footer__privacy" id="politika-privatnosti">
          <summary className="footer__privacy-toggle">
            Politika privatnosti
            <ChevronDown size={16} aria-hidden className="footer__privacy-chevron" />
          </summary>
          <div className="footer__privacy-panel">
            <PrivacyContent />
          </div>
        </details>

        <p className="footer__copy">© {new Date().getFullYear()} Radu Pizze</p>
      </div>
    </footer>
  )
}
