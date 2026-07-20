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
  const gosterilecekAltyazi = [eser.teknik, eser.yil].filter(Boolean).join(' · ')
  const cokluGorsel = gorseller.length > 1

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

        <div className="eser-modal-galeri">
          <div className="eser-modal-gorsel-cerceve">
            {gorseller.length > 0 && (
              <img
                className="eser-modal-gorsel"
                src={urlFor(gorseller[index]).width(1200).url()}
                alt=""
              />
            )}

            {cokluGorsel && (
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
                <div className="eser-modal-sayac">
                  {index + 1} / {gorseller.length}
                </div>
              </>
            )}
          </div>

          {cokluGorsel && (
            <div className="eser-modal-thumbnails">
              {gorseller.map((gorsel, i) => (
                <button
                  key={gorsel._key || i}
                  type="button"
                  className={`eser-modal-thumb ${i === index ? 'active' : ''}`}
                  onClick={() => setIndex(i)}
                  aria-label={`${i + 1}`}
                >
                  <img src={urlFor(gorsel).width(120).height(120).fit('crop').url()} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="eser-modal-bilgi">
          {eser.baslik && <h2>{eser.baslik}</h2>}
          {gosterilecekAltyazi && <p className="eser-modal-altyazi">{gosterilecekAltyazi}</p>}
          {eser.aciklama && <p className="eser-modal-aciklama">{eser.aciklama}</p>}

          <button
            type="button"
            className="eser-modal-ilgileniyorum"
            onClick={() => console.log('ilgileniyorum:', eser._id)}
          >
            {t('eserModal.ilgileniyorum')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default EserModal
