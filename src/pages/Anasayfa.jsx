import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { client, urlFor } from '../lib/sanity'
import { SERILER_ANASAYFA_QUERY } from '../lib/queries'

function Anasayfa() {
  const { t } = useTranslation()
  const [seriler, setSeriler] = useState([])

  useEffect(() => {
    client.fetch(SERILER_ANASAYFA_QUERY).then(setSeriler)
  }, [])

  return (
    <section className="page page-anasayfa">
      <h1>{t('home.title')}</h1>
      <p className="subtitle">{t('home.subtitle')}</p>

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
    </section>
  )
}

export default Anasayfa
