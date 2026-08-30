import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { href: '#pocetna', label: 'Početna' },
  { href: '#galerija', label: 'Galerija' },
  { href: '#meni', label: 'Meni' },
  { href: '#lokacija', label: 'Lokacija' },
  { href: '#poruci', label: 'Poruči' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#pocetna" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark">R</span>
          <span className="nav__name">
            Radu <em>Pizze</em>
          </span>
        </a>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="Meni"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#poruci" className="btn btn-primary nav__cta" onClick={() => setOpen(false)}>
            Poruči online
          </a>
        </nav>
      </div>
    </header>
  )
}
