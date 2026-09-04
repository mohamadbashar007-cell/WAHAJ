import { Starburst } from './Starburst'
import { useLanguage } from '../lib/language'
import { routeHref } from '../lib/paths'

export function Hero() {
  const { language } = useLanguage()
  const ar = language === 'ar'
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" /><Starburst className="hero-burst" />
      <div className="hero-meta reveal"><span>{ar ? 'شركة إبداعية مستقلة' : 'INDEPENDENT CREATIVE COMPANY'}</span><span>{ar ? 'القاهرة / نعمل في كل مكان' : 'CAIRO / WORKING EVERYWHERE'}</span></div>
      <h1 id="hero-title" className="hero-title" aria-label={ar ? 'نصنع علامات تجارية متوهجة' : 'We make brands glow'}>
        <span>{ar ? 'نصنع' : 'WE MAKE'}</span><span>{ar ? 'علامات لا تُنسى' : 'BRANDS'}</span><span className="glow">{ar ? 'تتوهج.' : 'GLOW.'}</span>
      </h1>
      <div className="hero-bottom reveal">
        <p>{ar ? 'نجمع الاستراتيجية والتصميم والتقنية لنحوّل الأفكار الواضحة إلى علامات وتجارب رقمية مؤثرة.' : 'Strategy, design and technology come together to turn clear ideas into distinctive brands and useful digital experiences.'}</p>
        <a href={routeHref('/work')} className="button button-yellow">{ar ? 'استعرض أعمالنا' : 'EXPLORE OUR WORK'} <span aria-hidden="true">↗</span></a>
      </div>
      <a href="#intro" className="scroll-cue">{ar ? 'مرّر للاستكشاف' : 'SCROLL TO EXPLORE'} <span aria-hidden="true">↓</span></a>
    </section>
  )
}
