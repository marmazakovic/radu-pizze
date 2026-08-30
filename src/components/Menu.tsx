import { useMemo, useState } from 'react'
import {
  categoryLabels,
  formatPrice,
  itemsByCategory,
  menuCategories,
  type MenuCategory,
  type MenuItem,
} from '../data/menu'
import './Menu.css'

export function Menu() {
  const [active, setActive] = useState<MenuCategory>('pizza')

  const activeCategory = menuCategories.find((c) => c.id === active)!
  const items = useMemo(() => itemsByCategory(active), [active])

  return (
    <section id="meni" className="section menu-section">
      <div className="container">
        <p className="section-eyebrow">Cenovnik</p>
        <h2 className="section-title">Meni</h2>
        <p className="section-lead">
          Cene su lokalne iz našeg cenovnika. Sastojci su orijentacioni — javi ako treba tačan
          spisak.
        </p>

        <div className="menu-tabs" role="tablist" aria-label="Kategorije menija">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={active === cat.id ? 'is-active' : ''}
              onClick={() => setActive(cat.id)}
            >
              {categoryLabels[cat.id]}
            </button>
          ))}
        </div>

        <section className="menu-category" aria-live="polite">
          <header className="menu-category__header">
            <h3 className="menu-category__title">{categoryLabels[active]}</h3>
            <p className="menu-category__desc">{activeCategory.description}</p>
            <span className="menu-category__count">{items.length} stavki</span>
          </header>

          <div className="menu-grid">
            {items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="menu-card">
      <div className="menu-card__media">
        <img src={item.image} alt={item.name} loading="lazy" />
      </div>
      <div className="menu-card__body">
        <div className="menu-card__head">
          <h4>{item.name}</h4>
        </div>
        <p className="menu-card__desc">{item.description}</p>

        <ul className="menu-card__prices">
          {item.sizes.map((s) => (
            <li key={s.label}>
              <span>{s.label}</span>
              <strong>{formatPrice(s.price)}</strong>
            </li>
          ))}
        </ul>

        <div className="menu-card__ingredients">
          <span className="menu-card__ingredients-label">Sastojci</span>
          <ul>
            {item.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
