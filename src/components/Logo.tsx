import logoUrl from '../assets/radu-pizze.svg'

type LogoProps = {
  className?: string
  variant?: 'dark' | 'light'
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Radu Pizze"
      className={`logo ${variant === 'light' ? 'logo--light' : ''} ${className}`.trim()}
      width={1218}
      height={775}
      decoding="async"
    />
  )
}
