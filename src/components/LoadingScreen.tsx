import { useEffect } from 'react'
import { motion } from 'framer-motion'
import './LoadingScreen.css'

type Props = {
  onComplete: () => void
}

const LOAD_MS = 2400

export function LoadingScreen({ onComplete }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, LOAD_MS)
    return () => window.clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        className="loading-pizza-wrap"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
      >
        <PizzaSvg />
      </motion.div>
    </motion.div>
  )
}

function PizzaSvg() {
  return (
    <svg
      className="loading-pizza"
      viewBox="0 0 200 200"
      width="160"
      height="160"
      aria-hidden
      role="img"
      aria-label="Učitavanje"
    >
      {/* Shadow */}
      <ellipse cx="100" cy="104" rx="86" ry="84" fill="rgba(28,25,23,0.08)" />

      {/* Crust edge */}
      <circle cx="100" cy="100" r="92" fill="#d4a017" />
      <circle cx="100" cy="100" r="88" fill="#e8b923" />

      {/* Baked crust rim */}
      <circle cx="100" cy="100" r="82" fill="none" stroke="#c9921a" strokeWidth="6" opacity="0.5" />

      {/* Sauce */}
      <circle cx="100" cy="100" r="78" fill="#c0392b" />

      {/* Cheese base */}
      <circle cx="100" cy="100" r="74" fill="#f5d76e" opacity="0.95" />

      {/* Melted cheese blobs */}
      <ellipse cx="78" cy="88" rx="14" ry="10" fill="#ffeaa7" opacity="0.85" />
      <ellipse cx="118" cy="95" rx="12" ry="9" fill="#ffeaa7" opacity="0.8" />
      <ellipse cx="95" cy="118" rx="15" ry="11" fill="#ffeaa7" opacity="0.85" />
      <ellipse cx="125" cy="72" rx="10" ry="8" fill="#ffeaa7" opacity="0.75" />

      {/* Slice lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="100"
          x2={100 + 74 * Math.cos((deg * Math.PI) / 180)}
          y2={100 + 74 * Math.sin((deg * Math.PI) / 180)}
          stroke="#c9921a"
          strokeWidth="1.5"
          opacity="0.35"
          strokeLinecap="round"
        />
      ))}

      {/* Pepperoni */}
      <circle cx="72" cy="78" r="9" fill="#962d22" />
      <circle cx="72" cy="78" r="7" fill="#c0392b" />
      <circle cx="70" cy="76" r="2" fill="#e74c3c" opacity="0.4" />

      <circle cx="118" cy="70" r="8" fill="#962d22" />
      <circle cx="118" cy="70" r="6.5" fill="#c0392b" />
      <circle cx="116" cy="68" r="1.5" fill="#e74c3c" opacity="0.4" />

      <circle cx="95" cy="112" r="9.5" fill="#962d22" />
      <circle cx="95" cy="112" r="7.5" fill="#c0392b" />

      <circle cx="130" cy="108" r="7" fill="#962d22" />
      <circle cx="130" cy="108" r="5.5" fill="#c0392b" />

      <circle cx="78" cy="128" r="7.5" fill="#962d22" />
      <circle cx="78" cy="128" r="6" fill="#c0392b" />

      <circle cx="108" cy="135" r="6" fill="#962d22" />
      <circle cx="108" cy="135" r="4.5" fill="#c0392b" />

      {/* Basil leaves */}
      <ellipse cx="85" cy="95" rx="5" ry="8" fill="#2d6a4f" transform="rotate(-30 85 95)" />
      <ellipse cx="112" cy="125" rx="4" ry="7" fill="#2d6a4f" transform="rotate(20 112 125)" />

      {/* Cherry tomato */}
      <circle cx="125" cy="88" r="5" fill="#c0392b" />
      <path d="M125 82c0 0-1 2-3 2.5 1.5 0 3-0.5 3-2.5z" fill="#2d6a4f" />
    </svg>
  )
}
