import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { carouselSlides } from '../data/menu'
import './Carousel.css'

export function Carousel() {
  const [index, setIndex] = useState(0)
  const total = carouselSlides.length

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % total)
    }, 5000)
    return () => window.clearInterval(id)
  }, [total])

  const go = (dir: -1 | 1) => {
    setIndex((i) => (i + dir + total) % total)
  }

  return (
    <section id="galerija" className="section carousel-section">
      <div className="container carousel-section__header">
        <p className="section-eyebrow">Galerija</p>
        <h2 className="section-title">Naše kreacije</h2>
        <p className="section-lead">
          Sveže iz peći — pice, pide i sendviči spremljeni sa pažnjom i italijanskim duhom.
        </p>
      </div>

      <div className="carousel">
        <div className="carousel__viewport">
          <div
            className="carousel__track"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {carouselSlides.map((slide, i) => (
              <article key={slide.id} className="carousel__slide" aria-hidden={i !== index}>
                <img src={slide.image} alt={slide.title} loading={i === 0 ? 'eager' : 'lazy'} />
                <div className="carousel__caption">
                  <h3>{slide.title}</h3>
                  <p>{slide.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button className="carousel__nav carousel__nav--prev" onClick={() => go(-1)} aria-label="Prethodna">
          <ChevronLeft size={22} />
        </button>
        <button className="carousel__nav carousel__nav--next" onClick={() => go(1)} aria-label="Sledeća">
          <ChevronRight size={22} />
        </button>

        <div className="carousel__dots" role="tablist" aria-label="Slajdovi">
          {carouselSlides.map((slide, i) => (
            <button
              key={slide.id}
              className={i === index ? 'is-active' : ''}
              aria-label={`Slajd ${i + 1}`}
              aria-selected={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        <div
          className="visually-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {carouselSlides[index].title} — {carouselSlides[index].subtitle}
        </div>

        <div className="carousel__counter" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
    </section>
  )
}
