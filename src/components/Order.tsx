import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { SITE } from '../config/site'
import { useCart } from '../context/CartContext'
import {
  categoryLabels,
  formatPrice,
  menuCategories,
  menuItems,
} from '../data/menu'
import { formatPhoneHint, isValidPhone, normalizePhone } from '../utils/phone'
import './Order.css'

type OrderType = 'delivery' | 'pickup'

async function submitOrder(payload: unknown) {
  // TODO: povezati sa backend / delivery API
  console.info('[Radu Pizze] order payload ready for API:', payload)
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true as const }
}

export function Order() {
  const { cart, addToCart, updateQty, clearCart } = useCart()
  const [selectedId, setSelectedId] = useState(menuItems[0].id)
  const [sizeIdx, setSizeIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [orderType, setOrderType] = useState<OrderType>('delivery')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const selected = useMemo(
    () => menuItems.find((i) => i.id === selectedId) ?? menuItems[0],
    [selectedId],
  )

  const size = selected.sizes[Math.min(sizeIdx, selected.sizes.length - 1)]

  const subtotal = cart.reduce((sum, line) => sum + line.size.price * line.qty, 0)
  const deliveryFee = orderType === 'delivery' && cart.length > 0 ? SITE.deliveryFee : 0
  const total = subtotal + deliveryFee
  const belowMin =
    orderType === 'delivery' &&
    cart.length > 0 &&
    SITE.minOrderDelivery > 0 &&
    subtotal < SITE.minOrderDelivery

  const onSelectItem = (id: string) => {
    setSelectedId(id)
    setSizeIdx(0)
  }

  const handleAddFromBuilder = () => {
    addToCart(selected, size, qty)
    setQty(1)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setPhoneError('')
    setErrorMsg('')

    const needsAddress = orderType === 'delivery'
    if (!cart.length) {
      setStatus('error')
      setErrorMsg('Dodaj barem jedno jelo u korpu.')
      return
    }
    if (!name.trim()) {
      setStatus('error')
      setErrorMsg('Unesi ime i prezime.')
      return
    }
    if (!phone.trim()) {
      setStatus('error')
      setErrorMsg('Unesi broj telefona.')
      return
    }
    if (!isValidPhone(phone)) {
      setStatus('error')
      setPhoneError('Unesi ispravan mobilni broj (npr. 061 234 5678).')
      setErrorMsg('Proveri format telefona.')
      return
    }
    if (needsAddress && !address.trim()) {
      setStatus('error')
      setErrorMsg('Unesi adresu dostave.')
      return
    }
    if (belowMin) {
      setStatus('error')
      setErrorMsg(
        `Minimalna porudžbina za dostavu je ${formatPrice(SITE.minOrderDelivery)}. Dodaj još jela ili izaberi preuzimanje u lokalu.`,
      )
      return
    }

    setStatus('loading')
    try {
      await submitOrder({
        orderType,
        customer: {
          name,
          phone: normalizePhone(phone),
          address: orderType === 'delivery' ? address : SITE.address,
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
      clearCart()
      setName('')
      setPhone('')
      setAddress('')
      setNote('')
    } catch {
      setStatus('error')
      setErrorMsg('Došlo je do greške. Pokušaj ponovo ili nas pozovi.')
    }
  }

  return (
    <section id="poruci" className="section order-section">
      <div className="container">
        <p className="section-eyebrow">Porudžbina</p>
        <h2 className="section-title">Poruči online</h2>
        <p className="section-lead">
          Dostava na adresu (+ {formatPrice(SITE.deliveryFee)}) ili preuzimanje u piceriji na{' '}
          {SITE.address}.
        </p>

        <aside className="order__info" aria-label="Informacije o dostavi">
          <p>
            <strong>Zona dostave:</strong> {SITE.deliveryZone}
          </p>
          {SITE.minOrderDelivery > 0 && (
            <p>
              <strong>Minimalna porudžbina (dostava):</strong>{' '}
              {formatPrice(SITE.minOrderDelivery)}
            </p>
          )}
        </aside>

        <div className="order__grid">
          <div className="order__builder">
            <label className="field">
              <span>Izaberi jelo</span>
              <select className="ui-select" value={selectedId} onChange={(e) => onSelectItem(e.target.value)}>
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
                <select className="ui-select" value={sizeIdx} onChange={(e) => setSizeIdx(Number(e.target.value))}>
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
                  {selected.sizes.length > 1 ? `${size.label}: ` : 'Lokal: '}
                  {formatPrice(size.price)}
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
              <button type="button" className="btn btn-secondary" onClick={handleAddFromBuilder}>
                <ShoppingBag size={18} />
                Dodaj u korpu
              </button>
            </div>
          </div>

          <form className="order__form" onSubmit={onSubmit} noValidate>
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
                  <span className="order__type-hint">+ {formatPrice(SITE.deliveryFee)}</span>
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
                  <span className="order__type-hint">Besplatno · {SITE.address}</span>
                </label>
              </div>
            </fieldset>

            {cart.length === 0 ? (
              <p className="order__empty">Korpa je prazna — dodaj nešto iz menija.</p>
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

            {belowMin && (
              <p className="order__msg order__msg--warn" role="alert">
                Još {formatPrice(SITE.minOrderDelivery - subtotal)} do minimalne porudžbine za dostavu.
              </p>
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="npr. Ana Marković"
                required
                autoComplete="name"
              />
            </label>
            <label className="field">
              <span>Telefon</span>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setPhoneError('')
                }}
                placeholder={formatPhoneHint()}
                required
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={!!phoneError}
                aria-describedby={phoneError ? 'phone-error' : undefined}
              />
              {phoneError && (
                <span id="phone-error" className="field-error" role="alert">
                  {phoneError}
                </span>
              )}
            </label>

            {orderType === 'delivery' ? (
              <label className="field">
                <span>Adresa dostave</span>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ulica i broj, sprat, interfon"
                  required
                  autoComplete="street-address"
                />
              </label>
            ) : (
              <div className="order__pickup-note">
                <strong>Preuzimanje u piceriji</strong>
                <p>{SITE.address}</p>
                <p className="order__pickup-hint">
                  Pozvaćemo te na broj koji ostaviš kada porudžbina bude spremna.
                </p>
              </div>
            )}

            <label className="field">
              <span>Napomena (opciono)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder={orderType === 'delivery' ? 'Bez luka, pozvoniti...' : 'Vreme preuzimanja...'}
              />
            </label>

            <p className="order__privacy">
              Slanjem porudžbine prihvataš{' '}
              <a href="#politika-privatnosti">politiku privatnosti</a>.
            </p>

            <button
              className="btn btn-primary order__submit"
              type="submit"
              disabled={status === 'loading' || belowMin}
            >
              {status === 'loading' ? 'Šaljemo...' : 'Pošalji porudžbinu'}
            </button>

            {status === 'success' && (
              <div className="order__msg order__msg--ok" role="status">
                <strong>Hvala! Porudžbina je primljena.</strong>
                <p>
                  {orderType === 'delivery'
                    ? 'Kontaktiraćemo te uskoro radi potvrde i vremena dostave.'
                    : 'Javićemo ti kada možeš da preuzmeš porudžbinu u piceriji.'}
                </p>
              </div>
            )}
            {status === 'error' && errorMsg && (
              <p className="order__msg order__msg--err" role="alert">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
