import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { urlFor } from '../lib/sanity'

function EserModal({ eser, onClose }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [eser])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!eser) return null

  const gorseller = eser.gorseller || []
  const gosterilecekAltyazi = [eser.teknik, eser.yil].filter(Boolean).join(', ')

  function oncekiGorsel() {
    setIndex((i) => (i === 0 ? gorseller.length - 1 : i - 1))
  }

  function sonrakiGorsel() {
    setIndex((i) => (i === gorseller.length - 1 ? 0 : i + 1))
  }

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

        {gorseller.length > 0 && (
          <div className="eser-modal-galeri">
            <img
              src={urlFor(gorseller[index]).width(900).height(700).fit('max').url()}
              alt=""
            />
            {gorseller.length > 1 && (
              <>
                <button
                  type="button"
                  className="eser-modal-ok eser-modal-ok-onceki"
                  onClick={oncekiGorsel}
                  aria-label={t('eserModal.oncekiGorsel')}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="eser-modal-ok eser-modal-ok-sonraki"
                  onClick={sonrakiGorsel}
                  aria-label={t('eserModal.sonrakiGorsel')}
                >
                  ›
                </button>
              </>
            )}
          </div>
        )}

        <div className="eser-modal-bilgi">
          {eser.baslik && <h2>{eser.baslik}</h2>}
          {gosterilecekAltyazi && <p>{gosterilecekAltyazi}</p>}
          {eser.aciklama && <p>{eser.aciklama}</p>}
        </div>

        <button
          type="button"
          className="eser-modal-ilgileniyorum"
          onClick={() => console.log('ilgileniyorum:', eser._id)}
        >
          {t('eserModal.ilgileniyorum')}
        </button>
      </motion.div>
    </motion.div>
  )
}

export default EserModal
