import { useEffect, useRef } from 'react'
export function Cursor() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)')
    const move = (event: PointerEvent) => {
      if (!cursor.current || !media.matches) return
      cursor.current.style.transform = `translate(${event.clientX + 14}px, ${event.clientY + 14}px)`
      cursor.current.style.opacity = event.target instanceof Element && event.target.closest('a,button,input,textarea,select') ? '0' : '1'
    }
    const hide = () => { if (cursor.current) cursor.current.style.opacity = '0' }
    document.addEventListener('pointermove', move, { passive: true }); document.addEventListener('pointerleave', hide); media.addEventListener('change', hide)
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); media.removeEventListener('change', hide) }
  }, [])
  return <div ref={cursor} className="cursor" aria-hidden="true" />
}
