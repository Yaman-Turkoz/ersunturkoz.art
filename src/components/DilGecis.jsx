import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

// Sarmaladığı metni, aktif dil değiştiğinde yumuşak fade-out → fade-in ile
// geçirir. Görseller bu sarmalın DIŞINDA tutulmalı ki yanıp sönmesinler.
// prefers-reduced-motion açıksa animasyon uygulanmaz, metin anında değişir.
const gecis = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: 'easeOut' },
}

function DilGecis({ children, as = 'div', className }) {
  const { i18n } = useTranslation()
  const azalt = useReducedMotion()

  if (azalt) {
    const Etiket = as
    return <Etiket className={className}>{children}</Etiket>
  }

  const M = motion[as]
  return (
    <AnimatePresence mode="wait" initial={false}>
      <M key={i18n.language} className={className} {...gecis}>
        {children}
      </M>
    </AnimatePresence>
  )
}

export default DilGecis
