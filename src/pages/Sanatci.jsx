import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { client, urlFor } from '../lib/sanity'
import { SITE_AYARLARI_QUERY } from '../lib/queries'
import GeriButonu from '../components/GeriButonu'

function Sanatci() {
  const { t } = useTranslation()
  const [siteAyarlari, setSiteAyarlari] = useState(null)

  useEffect(() => {
    client.fetch(SITE_AYARLARI_QUERY).then(setSiteAyarlari)
  }, [])

  return (
    <div className="page-sanatci">
      <GeriButonu />
      <div className="sanatci-ic">
        <motion.div
          className="sanatci-foto"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {siteAyarlari?.sanatciFotografi ? (
            <img
              src={urlFor(siteAyarlari.sanatciFotografi).width(700).height(933).fit('crop').url()}
              alt=""
            />
          ) : (
            <div className="sanatci-foto-placeholder" />
          )}
        </motion.div>

        <motion.div
          className="sanatci-metin"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <span className="sanatci-kicker">{t('sanatci.title')}</span>
          <h1>{t('sanatci.isim')}</h1>
          <p>{t('sanatci.body')}</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Sanatci
