import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import {
  categoryLabels,
  formatPrice,
  menuCategories,
  menuItems,
  type MenuItem,
  type SizePrice,
} from '../data/menu'
import './Order.css'

const DELIVERY_FEE = 400
const PICKUP_ADDRESS = 'Ćirpanova 2, Novi Sad'

type OrderType = 'delivery' | 'pickup'

type CartLine = {
  key: string
  item: MenuItem
  size: SizePrice
  qty: number
}

async function submitOrder(payload: unknown) {
  // TODO: povezati sa backend / delivery API
  console.info('[Radu Pizze] order payload ready for API:', payload)
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true as const }
}

export function Order() {
  const [selectedId, setSelectedId] = useState(menuItems[0].id)
  const [sizeIdx, setSizeIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [cart, setCart] = useState<CartLine[]>([])
  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const selected = useMemo(
    () => menuItems.find((i) => i.id === selectedId) ?? menuItems[0],
    [selectedId],
  )

  const size = selected.sizes[Math.min(sizeIdx, selected.sizes.length - 1)]

  const subtotal = cart.reduce((sum, line) => sum + line.size.price * line.qty, 0)
  const deliveryFee = orderType === 'delivery' && cart.length > 0 ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  const onSelectItem = (id: string) => {
    setSelectedId(id)
    setSizeIdx(0)
  }

  const addToCart = () => {
    const key = `${selected.id}__${size.label}`
    setCart((prev) => {
      const existing = prev.find((l) => l.key === key)
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      }
      return [...prev, { key, item: selected, size, qty }]
    })
    setQty(1)
  }

  const updateQty = (key: string, next: number) => {
    setCart((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: next } : l)).filter((l) => l.qty > 0),
    )
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const needsAddress = orderType === 'delivery'
    if (!cart.length || !name.trim() || !phone.trim() || (needsAddress && !address.trim())) {
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      await submitOrder({
        orderType,
        customer: {
          name,
          phone,
          address: orderType === 'delivery' ? address : PICKUP_ADDRESS,
          note,
        },
        items: cart.map((l) => ({
          id: l.item.id,
          name: l.item.name,
          size: l.size.label,
          qty: l.qty,
          price: l.size.price,
        })),
        subtotal,
        deliveryFee,
        total,
        createdAt: new Date().toISOString(),
      })
      setStatus('success')
      setCart([])
      setName('')
      setPhone('')
      setAddress('')
      setNote('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="poruci" className="section order-section">
      <div className="container">
        <p className="section-eyebrow">Porudžbina</p>
        <h2 className="section-title">Poruči online</h2>
        <p className="section-lead">
          Dostava na adresu (+ {formatPrice(DELIVERY_FEE)}) ili preuzimanje u piceriji na {PICKUP_ADDRESS}.
        </p>

        <div className="order__grid">
          <div className="order__builder">
            <label className="field">
              <span>Izaberi jelo</span>
              <select value={selectedId} onChange={(e) => onSelectItem(e.target.value)}>
                {menuCategories.map((cat) => (
                  <optgroup key={cat.id} label={categoryLabels[cat.id]}>
                    {menuItems
                      .filter((item) => item.category === cat.id)
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>

            {selected.sizes.length > 1 && (
              <label className="field">
                <span>Veličina</span>
                <select value={sizeIdx} onChange={(e) => setSizeIdx(Number(e.target.value))}>
                  {selected.sizes.map((s, i) => (
                    <option key={s.label} value={i}>
                      {s.label} — {formatPrice(s.price)}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="order__selected">
              <img src={selected.image} alt={selected.name} />
              <div>
                <h3>{selected.name}</h3>
                <p>{selected.ingredients.join(' · ')}</p>
                <strong>
                  {size.label}: {formatPrice(size.price)}
                </strong>
              </div>
            </div>

            <div className="order__qty-row">
              <div className="qty">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Manje">
                  <Minus size={16} />
                </button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Više">
                  <Plus size={16} />
                </button>
              </div>
              <button type="button" className="btn btn-secondary" onClick={addToCart}>
                <ShoppingBag size={18} />
                Dodaj u korpu
              </button>
            </div>
          </div>

          <form className="order__form" onSubmit={onSubmit}>
            <h3 className="order__form-title">Tvoja porudžbina</h3>

            <fieldset className="order__type">
              <legend>Način preuzimanja</legend>
              <div className="order__type-options">
                <label className={`order__type-option ${orderType === 'delivery' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={() => setOrderType('delivery')}
                  />
                  <span className="order__type-label">Dostava</span>
                  <span className="order__type-hint">+ {formatPrice(DELIVERY_FEE)}</span>
                </label>
                <label className={`order__type-option ${orderType === 'pickup' ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={() => setOrderType('pickup')}
                  />
                  <span className="order__type-label">Preuzimanje u lokalu</span>
                  <span className="order__type-hint">Besplatno · {PICKUP_ADDRESS}</span>
                </label>
              </div>
            </fieldset>

            {cart.length === 0 ? (
              <p className="order__empty">Korpa je prazna — dodaj nešto ukusno.</p>
            ) : (
              <ul className="order__cart">
                {cart.map((line) => (
                  <li key={line.key}>
                    <div>
                      <strong>
                        {line.item.name}
                        {line.item.sizes.length > 1 ? ` (${line.size.label})` : ''}
                      </strong>
                      <span>{formatPrice(line.size.price * line.qty)}</span>
                    </div>
                    <div className="order__cart-actions">
                      <div className="qty qty--sm">
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          aria-label="Manje"
                        >
                          <Minus size={14} />
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          aria-label="Više"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="order__trash"
                        onClick={() => updateQty(line.key, 0)}
                        aria-label="Ukloni"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="order__summary">
              <div className="order__summary-row">
                <span>Međuzbir</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {orderType === 'delivery' && cart.length > 0 && (
                <div className="order__summary-row">
                  <span>Dostava</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="order__total">
                <span>Ukupno</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <label className="field">
              <span>Ime i prezime</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="npr. Ana Marković" required />
            </label>
            <label className="field">
              <span>Telefon</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06x xxx xxxx" required />
            </label>

            {orderType === 'delivery' ? (
              <label className="field">
                <span>Adresa dostave</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ulica i broj, sprat, interfon"
                  required
                />
              </label>
            ) : (
              <div className="order__pickup-note">
                <strong>Preuzimanje u piceriji</strong>
                <p>{PICKUP_ADDRESS}</p>
                <p className="order__pickup-hint">Porudžbina će biti spremna za preuzimanje — javićemo ti kada bude gotova.</p>
              </div>
            )}

            <label className="field">
              <span>Napomena (opciono)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder={orderType === 'delivery' ? 'Bez luka, pozvoniti...' : 'Vreme preuzimanja, posebni zahtevi...'}
              />
            </label>

            <button className="btn btn-primary order__submit" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Šaljemo...' : 'Pošalji porudžbinu'}
            </button>

            {status === 'success' && (
              <p className="order__msg order__msg--ok">
                Porudžbina je spremna za API — trenutno je samo potvrda na frontendu.
              </p>
            )}
            {status === 'error' && (
              <p className="order__msg order__msg--err">
                Popuni sva polja, dodaj barem jedno jelo u korpu
                {orderType === 'delivery' ? ' i unesi adresu dostave' : ''}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
