import { Logo } from './Logo'
import './Hero.css'

export function Hero() {
  return (
    <section id="pocetna" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="section-eyebrow section-eyebrow--light">Novi Sad · Italia nel cuore</p>
          <h1 className="hero__title">
            Autentične pice,
            <br />
            <span>pide &amp; sendviči</span>
          </h1>
          <p className="hero__lead">
            Radu Pizze — hrskava kora, sveži sastojci i ukus koji te vraća u Italiju.
            Poruči online ili svrati u Ćirpanovu 2.
          </p>
          <div className="hero__actions">
            <a href="#meni" className="btn btn-primary">
              Pogledaj meni
            </a>
            <a href="#poruci" className="btn btn-outline-light">
              Poruči online
            </a>
          </div>
          <ul className="hero__meta">
            <li>
              <strong>Ćirpanova 2</strong>
              <span>Novi Sad</span>
            </li>
            <li>
              <strong>Radno vreme</strong>
              <span>Uskoro</span>
            </li>
            <li>
              <strong>Dostava</strong>
              <span>Od 400 RSD</span>
            </li>
          </ul>
        </div>

        <div className="hero__logo-wrap">
          <Logo className="hero__logo" variant="light" />
        </div>
      </div>
      <div className="italian-stripe hero__stripe" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    </section>
  )
}
