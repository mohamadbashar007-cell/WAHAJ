export const LOGO_STAR_PATH = 'm50 0 8 30 24-21-12 31 30 10-30 8 21 24-31-12-10 30-8-30-24 21 12-31L0 50l30-8L9 18l31 12Z'

export function Starburst({ className = '', label, tone = 'light' }: { className?: string; label?: string; tone?: 'light' | 'dark' }) {
  return <svg className={`starburst ${className}`} viewBox="0 0 100 100" fill={tone === 'dark' ? 'var(--navy)' : 'var(--yellow)'} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false"><path d={LOGO_STAR_PATH} /></svg>
}
