import './Hero.css'

export function Hero() {
  return (
    <section id="pocetna" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="section-eyebrow">Novi Sad · Italia nel cuore</p>
          <h1 className="hero__title">
            Autentične pice,
            <br />
            <span>pide &amp; sendviči</span>
          </h1>
          <p className="hero__lead">
            Radu Pizze — hrskava kora, sveži sastojci i ukus koji te vraća u Italiju.
            Poruči na adresu ili svrati u Ćirpanovu 2.
          </p>
          <div className="hero__actions">
            <a href="#meni" className="btn btn-primary">
              Pogledaj meni
            </a>
            <a href="#poruci" className="btn btn-secondary">
              Poruči dostavu
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
              <span>Online porudžbina</span>
            </li>
          </ul>
        </div>

        <div className="hero__logo-wrap">
          <div className="hero__logo-ring">
            {/* Placeholder — zameni kada stigne logo */}
            <div className="hero__logo" role="img" aria-label="Radu Pizze logo">
              <span className="hero__logo-r">R</span>
              <span className="hero__logo-word">
                Radu
                <em>Pizze</em>
              </span>
              <span className="hero__logo-sub">dal 2024 · Novi Sad</span>
            </div>
          </div>
          <p className="hero__logo-note">Logo će biti zamenjen kada ga pošalješ</p>
        </div>
      </div>
    </section>
  )
}
