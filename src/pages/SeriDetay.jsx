import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SERI_DETAY_QUERY } from '../lib/queries'
import EserModal from '../components/EserModal'
import GeriButonu from '../components/GeriButonu'

function SeriDetay() {
  const { seriSlug } = useParams()
  const { t } = useTranslation()
  const [seri, setSeri] = useState(undefined)
  const [seciliEser, setSeciliEser] = useState(null)

  useEffect(() => {
    setSeri(undefined)
    client.fetch(SERI_DETAY_QUERY, { slug: seriSlug }).then(setSeri)
  }, [seriSlug])

  if (seri === undefined) {
    return <section className="page page-seri-detay-durum" />
  }

  if (!seri) {
    return (
      <section className="page page-seri-detay-durum">
        <h1>{t('seriDetay.bulunamadi')}</h1>
        <Link to="/">{t('seriDetay.anasayfayaDon')}</Link>
      </section>
    )
  }

  return (
    <div className="page-seri-detay">
      <header className="seri-detay-header">
        <GeriButonu />
        <h1>{seri.baslik}</h1>
      </header>

      <section className="seri-detay-icerik">
        <div className="eserler-grid">
          {seri.eserler.map((eser) => (
            <div
              key={eser._id}
              className="kart eser-kart"
              role="button"
              tabIndex={0}
              onClick={() => setSeciliEser(eser)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSeciliEser(eser)
              }}
            >
              <div className="kart-gorsel-alan">
                {eser.gorseller?.[0] && (
                  <img src={urlFor(eser.gorseller[0]).width(500).height(667).fit('crop').url()} alt="" />
                )}
              </div>
              <div className="kart-bilgi">
                <h2>{eser.baslik}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {seciliEser && <EserModal eser={seciliEser} onClose={() => setSeciliEser(null)} />}
      </AnimatePresence>
    </div>
  )
}

export default SeriDetay
