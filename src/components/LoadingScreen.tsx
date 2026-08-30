import { motion } from 'framer-motion'
import './LoadingScreen.css'

type Props = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: Props) {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="loading-screen__inner">
        <motion.div
          className="loading-pizza"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
        >
          <PizzaSvg />
        </motion.div>
        <p className="loading-screen__brand">Radu Pizze</p>
        <p className="loading-screen__hint">Novi Sad · Ćirpanova 2</p>
        <motion.div
          className="loading-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  )
}

function PizzaSvg() {
  return (
    <svg viewBox="0 0 200 200" width="120" height="120" aria-hidden>
      <circle cx="100" cy="100" r="88" fill="#fef4dc" stroke="#e5b020" strokeWidth="3" />
      <circle cx="100" cy="100" r="72" fill="#fff6eb" />
      <circle cx="72" cy="78" r="7" fill="#c0392b" opacity="0.9" />
      <circle cx="118" cy="72" r="6" fill="#c0392b" opacity="0.9" />
      <circle cx="95" cy="112" r="8" fill="#c0392b" opacity="0.85" />
      <circle cx="128" cy="108" r="5" fill="#c0392b" opacity="0.75" />
      <circle cx="110" cy="132" r="4" fill="#2d6a4f" opacity="0.7" />
    </svg>
  )
}
