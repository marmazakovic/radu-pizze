import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="italian-stripe" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__mark">R</span>
          <div>
            <strong>Radu Pizze</strong>
            <p>Ćirpanova 2, Novi Sad</p>
          </div>
        </div>
        <p className="footer__tagline">Fatto con amore · pečeno sa strašću</p>
        <p className="footer__copy">© {new Date().getFullYear()} Radu Pizze</p>
      </div>
    </footer>
  )
}
