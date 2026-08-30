import { Clock, MapPin, Phone } from 'lucide-react'
import './Location.css'

export function Location() {
  return (
    <section id="lokacija" className="section location-section">
      <div className="container location__grid">
        <div>
          <p className="section-eyebrow">Gde smo</p>
          <h2 className="section-title">Lokacija &amp; radno vreme</h2>
          <p className="section-lead">
            Nađi nas u centru Novog Sada — Ćirpanova 2. Radno vreme ćemo dopuniti čim ga pošalješ.
          </p>

          <ul className="location__cards">
            <li className="location__card">
              <span className="location__icon">
                <MapPin size={20} />
              </span>
              <div>
                <h3>Adresa</h3>
                <p>Ćirpanova 2, Novi Sad</p>
                <a
                  className="location__link"
                  href="https://www.google.com/maps/search/?api=1&query=%C4%86irpanova+2+Novi+Sad"
                  target="_blank"
                  rel="noreferrer"
                >
                  Otvori na mapi →
                </a>
              </div>
            </li>
            <li className="location__card">
              <span className="location__icon">
                <Clock size={20} />
              </span>
              <div>
                <h3>Radno vreme</h3>
                <p className="location__placeholder">Placeholder — biće ažurirano</p>
                <ul className="location__hours">
                  <li>
                    <span>Ponedeljak – Petak</span>
                    <span>— : —</span>
                  </li>
                  <li>
                    <span>Subota</span>
                    <span>— : —</span>
                  </li>
                  <li>
                    <span>Nedelja</span>
                    <span>— : —</span>
                  </li>
                </ul>
              </div>
            </li>
            <li className="location__card">
              <span className="location__icon">
                <Phone size={20} />
              </span>
              <div>
                <h3>Kontakt</h3>
                <p>Telefon i društvene mreže možemo dodati kada budeš spreman.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="location__map">
          <iframe
            title="Radu Pizze — Ćirpanova 2, Novi Sad"
            src="https://maps.google.com/maps?q=%C4%86irpanova%202%2C%20Novi%20Sad&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="location__map-badge">Ćirpanova 2</div>
        </div>
      </div>
    </section>
  )
}
