import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Seo from '../components/Seo'
import DilGecis from '../components/DilGecis'

// Giriş animasyonu — site geneliyle uyumlu fade/slide.
// prefers-reduced-motion, global MotionConfig reducedMotion="user" ile yönetiliyor.
const kap = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const oge = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="page-notfound">
      <Seo title={t('notFound.baslik')} />
      <motion.div className="notfound-ic" variants={kap} initial="hidden" animate="visible">
        <motion.p className="notfound-kod" variants={oge} aria-hidden="true">
          404
        </motion.p>
        <motion.div variants={oge}>
          <DilGecis as="h1" className="notfound-baslik">
            {t('notFound.baslik')}
          </DilGecis>
        </motion.div>
        <motion.div variants={oge}>
          <DilGecis as="p" className="notfound-aciklama">
            {t('notFound.aciklama')}
          </DilGecis>
        </motion.div>
        <motion.div variants={oge}>
          <Link to="/" className="notfound-anasayfa">
            <DilGecis as="span">{t('notFound.anasayfa')}</DilGecis>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
