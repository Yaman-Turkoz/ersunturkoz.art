import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SERI_DETAY_QUERY } from '../lib/queries'
import EserModal from '../components/EserModal'

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
    return <section className="page page-seri-detay" />
  }

  if (!seri) {
    return (
      <section className="page page-seri-detay">
        <h1>{t('seriDetay.bulunamadi')}</h1>
        <Link to="/">{t('seriDetay.anasayfayaDon')}</Link>
      </section>
    )
  }

  return (
    <section className="page page-seri-detay">
      <h1>{seri.baslik}</h1>
      {seri.aciklama && <p>{seri.aciklama}</p>}

      <div className="kart-grid">
        {seri.eserler.map((eser) => (
          <div
            key={eser._id}
            className="kart"
            role="button"
            tabIndex={0}
            onClick={() => setSeciliEser(eser)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSeciliEser(eser)
            }}
          >
            {eser.gorseller?.[0] && (
              <img src={urlFor(eser.gorseller[0]).width(400).height(300).fit('crop').url()} alt="" />
            )}
            <h2>{eser.baslik}</h2>
            {(eser.yil || eser.teknik) && (
              <p>{[eser.teknik, eser.yil].filter(Boolean).join(', ')}</p>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {seciliEser && <EserModal eser={seciliEser} onClose={() => setSeciliEser(null)} />}
      </AnimatePresence>
    </section>
  )
}

export default SeriDetay
