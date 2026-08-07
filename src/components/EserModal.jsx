import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { getLocalized } from '../lib/getLocalized'
import Galeri from './Galeri'
import IlgiFormu from './IlgiFormu'

function EserModal({ eser, onClose }) {
  const { t, i18n } = useTranslation()
  const azalt = useReducedMotion()
  const [formAcik, setFormAcik] = useState(false)

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!eser) return null

  const dil = i18n.resolvedLanguage
  const baslik = getLocalized(eser.baslik, dil)
  const aciklama = getLocalized(eser.aciklama, dil)
  const gosterilecekAltyazi = eser.teknik || ''

  // Durum yoksa/boşsa "available" (satışta) kabul et — mevcut eserler sorun çıkarmasın.
  const durum = eser.durum || 'available'
  const satista = durum === 'available' || durum === 'artist'

  return (
    <motion.div
      className="eser-modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.div
        className="eser-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button
          type="button"
          className="eser-modal-kapat"
          onClick={onClose}
          aria-label={t('eserModal.kapat')}
        >
          ×
        </button>

        <Galeri gorseller={eser.gorseller || []} />

        <div className="eser-modal-bilgi">
          <AnimatePresence mode="wait" initial={false}>
            {formAcik ? (
              <IlgiFormu
                key="form"
                eserBasligi={baslik}
                onGeri={() => setFormAcik(false)}
              />
            ) : (
              <motion.div
                key={azalt ? 'bilgi' : `bilgi-${i18n.language}`}
                className="eser-modal-bilgi-icerik"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {baslik && <h2>{baslik}</h2>}
                {gosterilecekAltyazi && (
                  <p className="eser-modal-altyazi">{gosterilecekAltyazi}</p>
                )}
                {aciklama && <p className="eser-modal-aciklama">{aciklama}</p>}

                <div className="eser-modal-durum-satir">
                  <p className="eser-modal-durum">{t(`eserDurumu.${durum}`)}</p>
                  {durum === 'private' && (
                    <span className="eser-modal-durum-nokta" aria-hidden="true" />
                  )}
                </div>

                <button
                  type="button"
                  className="eser-modal-ilgileniyorum"
                  onClick={() => satista && setFormAcik(true)}
                  disabled={!satista}
                  aria-disabled={!satista}
                >
                  {t('eserModal.ilgileniyorum')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default EserModal
