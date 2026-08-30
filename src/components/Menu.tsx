import { useMemo, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
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
  const [addedId, setAddedId] = useState<string | null>(null)

  const activeCategory = menuCategories.find((c) => c.id === active)!
  const items = useMemo(() => itemsByCategory(active), [active])

  const flashAdded = (id: string) => {
    setAddedId(id)
    window.setTimeout(() => setAddedId(null), 1800)
  }

  return (
    <section id="meni" className="section menu-section">
      <div className="container">
        <p className="section-eyebrow">Cenovnik</p>
        <h2 className="section-title">Meni</h2>
        <p className="section-lead">
          Sve cene su lokalne. Pice imaju tri veličine; pide, sendviči i calzone — po komadu.
        </p>

        <div className="menu-tabs-wrap">
          <div className="menu-tabs" role="tablist" aria-label="Kategorije menija">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                id={`tab-${cat.id}`}
                role="tab"
                aria-selected={active === cat.id}
                aria-controls={`panel-${cat.id}`}
                className={active === cat.id ? 'is-active' : ''}
                onClick={() => setActive(cat.id)}
              >
                {categoryLabels[cat.id]}
              </button>
            ))}
          </div>
        </div>

        <section
          className="menu-category"
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
        >
          <header className="menu-category__header">
            <h3 className="menu-category__title">{categoryLabels[active]}</h3>
            <p className="menu-category__desc">{activeCategory.description}</p>
            <span className="menu-category__count">{items.length} stavki</span>
          </header>

          <div className="menu-grid">
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                justAdded={addedId === item.id}
                onAdded={() => flashAdded(item.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

function MenuCard({
  item,
  justAdded,
  onAdded,
}: {
  item: MenuItem
  justAdded: boolean
  onAdded: () => void
}) {
  const { addToCart } = useCart()
  const [sizeIdx, setSizeIdx] = useState(0)
  const size = item.sizes[Math.min(sizeIdx, item.sizes.length - 1)]
  const multiSize = item.sizes.length > 1

  const handleAdd = () => {
    addToCart(item, size, 1)
    onAdded()
  }

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

        <div className="menu-card__prices">
          {multiSize ? (
            <ul className="menu-card__price-list">
              {item.sizes.map((s) => (
                <li key={s.label}>
                  <span>{s.label}</span>
                  <strong>{formatPrice(s.price)}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p className="menu-card__price-single">
              <span className="menu-card__price-label">Lokal</span>
              <strong>{formatPrice(item.sizes[0].price)}</strong>
            </p>
          )}
        </div>

        <div className="menu-card__ingredients">
          <span className="menu-card__ingredients-label">Sastojci</span>
          <ul>
            {item.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
        </div>

        <div className="menu-card__actions">
          {multiSize && (
            <label className="menu-card__size">
              <span className="visually-hidden">Veličina za {item.name}</span>
              <select
                className="ui-select ui-select--compact"
                value={sizeIdx}
                onChange={(e) => setSizeIdx(Number(e.target.value))}
                aria-label={`Veličina — ${item.name}`}
              >
                {item.sizes.map((s, i) => (
                  <option key={s.label} value={i}>
                    {s.label} — {formatPrice(s.price)}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button
            type="button"
            className={`btn btn-primary menu-card__add ${justAdded ? 'is-added' : ''}`}
            onClick={handleAdd}
          >
            <ShoppingBag size={16} aria-hidden />
            {justAdded ? 'Dodato ✓' : 'Dodaj u korpu'}
          </button>
        </div>
      </div>
    </article>
  )
}
