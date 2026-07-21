import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { urlFor } from '../lib/sanity'

// Görsel galerisi: ok butonları, sayaç ve thumbnail şeridi ile çoklu görsel
// arasında gezinme. Hem EserModal hem SergiModal tarafından kullanılır.
function Galeri({ gorseller = [] }) {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const cokluGorsel = gorseller.length > 1

  useEffect(() => {
    setIndex(0)
  }, [gorseller])

  if (gorseller.length === 0) return null

  function oncekiGorsel() {
    setIndex((i) => (i === 0 ? gorseller.length - 1 : i - 1))
  }

  function sonrakiGorsel() {
    setIndex((i) => (i === gorseller.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="eser-modal-galeri">
      <div className="eser-modal-gorsel-cerceve">
        <img
          className="eser-modal-gorsel"
          src={urlFor(gorseller[index]).width(1200).url()}
          alt=""
        />

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
  )
}

export default Galeri
