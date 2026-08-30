import './BackgroundDecor.css'

/** Subtle scattered basil & tomato accents */
export function BackgroundDecor() {
  return (
    <div className="bg-decor" aria-hidden>
      <Tomato className="bg-decor__item t1" />
      <Tomato className="bg-decor__item t2" />
      <Basil className="bg-decor__item b1" />
      <Basil className="bg-decor__item b2" />
    </div>
  )
}

function Tomato({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" width="40" height="40">
      <ellipse cx="32" cy="36" rx="18" ry="16" fill="#c0392b" />
      <path
        d="M32 18c0 0-4 6-10 8 4-1 7 1 10 4 3-3 6-5 10-4-6-2-10-8-10-8z"
        fill="#2d6a4f"
      />
    </svg>
  )
}

function Basil({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 64" width="32" height="48">
      <path
        d="M20 58C20 58 8 42 8 28c0-10 6-18 12-22 6 4 12 12 12 22 0 14-12 30-12 30z"
        fill="#2d6a4f"
      />
      <path d="M20 12v46" stroke="#245a42" strokeWidth="1" fill="none" />
    </svg>
  )
}
