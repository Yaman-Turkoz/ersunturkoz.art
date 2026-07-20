import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SERILER_ANASAYFA_QUERY, SITE_AYARLARI_QUERY } from '../lib/queries'
import logoFull from '../assets/logo/logo-full.png'

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function Anasayfa() {
  const { t } = useTranslation()
  const [seriler, setSeriler] = useState([])
  const [siteAyarlari, setSiteAyarlari] = useState(null)

  useEffect(() => {
    client.fetch(SERILER_ANASAYFA_QUERY).then(setSeriler)
    client.fetch(SITE_AYARLARI_QUERY).then(setSiteAyarlari)
  }, [])

  return (
    <div className="page-anasayfa">
      <section className="hero">
        <motion.img
          src={logoFull}
          alt="Ersun Türköz"
          className="hero-logo"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {siteAyarlari?.heroEserGorseli && (
          <motion.img
            src={urlFor(siteAyarlari.heroEserGorseli).width(900).url()}
            alt=""
            className="hero-eser-gorseli"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
          />
        )}
      </section>

      <motion.section className="tanitim" {...sectionReveal}>
        <h2>{t('home.tanitimBaslik')}</h2>
        <p>{t('home.tanitimMetin')}</p>
      </motion.section>

      <motion.section className="seriler" {...sectionReveal}>
        <div className="kart-grid">
          <Link to="/sanatci" className="kart">
            <div className="kart-gorsel-alan">
              {siteAyarlari?.sanatciFotografi && (
                <img
                  src={urlFor(siteAyarlari.sanatciFotografi).width(400).height(300).fit('crop').url()}
                  alt=""
                />
              )}
            </div>
            <h2>{t('home.sanatciKart')}</h2>
            <p>{t('home.sanatciAciklama')}</p>
          </Link>

          {seriler.map((seri) => (
            <Link key={seri._id} to={`/eserler/${seri.slug}`} className="kart">
              <div className="kart-gorsel-alan">
                {seri.kapakGorseli && (
                  <img src={urlFor(seri.kapakGorseli).width(400).height(300).fit('crop').url()} alt="" />
                )}
              </div>
              <h2>{seri.baslik}</h2>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Anasayfa
