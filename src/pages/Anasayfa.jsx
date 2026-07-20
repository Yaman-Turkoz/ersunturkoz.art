import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SERILER_ANASAYFA_QUERY } from '../lib/queries'
import logoFull from '../assets/logo/logo-full.png'

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const sectionReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

function Anasayfa() {
  const { t } = useTranslation()
  const [seriler, setSeriler] = useState([])

  useEffect(() => {
    client.fetch(SERILER_ANASAYFA_QUERY).then(setSeriler)
  }, [])

  return (
    <div className="page-anasayfa">
      <motion.section
        className="hero"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          variants={heroItem}
          src={logoFull}
          alt=""
          className="hero-logo"
        />
        <motion.h1 variants={heroItem}>{t('home.title')}</motion.h1>
        <motion.p variants={heroItem} className="subtitle">
          {t('home.subtitle')}
        </motion.p>
      </motion.section>

      <motion.section className="tanitim" {...sectionReveal}>
        <h2>{t('home.tanitimBaslik')}</h2>
        <p>{t('home.tanitimMetin')}</p>
      </motion.section>

      <motion.section className="seriler" {...sectionReveal}>
        <div className="kart-grid">
          <Link to="/sanatci" className="kart">
            <h2>{t('home.sanatciKart')}</h2>
            <p>{t('home.sanatciAciklama')}</p>
          </Link>

          {seriler.map((seri) => (
            <Link key={seri._id} to={`/eserler/${seri.slug}`} className="kart">
              {seri.kapakGorseli && (
                <img src={urlFor(seri.kapakGorseli).width(400).height(300).fit('crop').url()} alt="" />
              )}
              <h2>{seri.baslik}</h2>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default Anasayfa
