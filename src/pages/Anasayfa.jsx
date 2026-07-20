import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
  const location = useLocation()
  const [seriler, setSeriler] = useState([])
  const [siteAyarlari, setSiteAyarlari] = useState(null)

  useEffect(() => {
    client.fetch(SERILER_ANASAYFA_QUERY).then(setSeriler)
    client.fetch(SITE_AYARLARI_QUERY).then(setSiteAyarlari)
  }, [])

  useEffect(() => {
    const hedef = location.state?.scrollTo
    if (!hedef) return
    const zamanlayici = setTimeout(() => {
      document.getElementById(hedef)?.scrollIntoView({ block: 'start' })
    }, 120)
    window.history.replaceState({}, '')
    return () => clearTimeout(zamanlayici)
  }, [location.state])

  return (
    <div className="page-anasayfa">
      <section className="hero">
        {siteAyarlari?.heroEserGorseli && (
          <motion.img
            src={urlFor(siteAyarlari.heroEserGorseli).width(1200).url()}
            alt=""
            className="hero-eser-gorseli"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        )}

        <motion.img
          src={logoFull}
          alt="Ersun Türköz"
          className="hero-logo"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </section>

      <motion.section className="tanitim" id="sanatci-bolum" {...sectionReveal}>
        <div className="tanitim-icerik">
          {siteAyarlari?.sanatciFotografi && (
            <div className="tanitim-foto">
              <img
                src={urlFor(siteAyarlari.sanatciFotografi).width(600).height(800).fit('crop').url()}
                alt=""
              />
            </div>
          )}
          <div className="tanitim-metin">
            <h2>{t('home.tanitimBaslik')}</h2>
            <p>{t('home.tanitimMetin')}</p>
            <Link to="/sanatci" className="tanitim-link">
              {t('home.sanatciKesfet')}
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section className="seriler" id="koleksiyonlar" {...sectionReveal}>
        <div className="seriler-ic">
          <h2 className="bolum-baslik">{t('home.koleksiyonlar')}</h2>
          <div className="kart-grid">
            {seriler.map((seri) => (
              <Link key={seri._id} to={`/eserler/${seri.slug}`} className="kart">
                <div className="kart-gorsel-alan">
                  {seri.kapakGorseli && (
                    <img src={urlFor(seri.kapakGorseli).width(500).height(667).fit('crop').url()} alt="" />
                  )}
                </div>
                <div className="kart-bilgi">
                  <h2>{seri.baslik}</h2>
                  <span className="kart-altbilgi">{t('home.seriEtiket')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Anasayfa
