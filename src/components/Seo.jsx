import { Helmet } from 'react-helmet-async'

// Sayfa bazlı <title>. Aktif i18n diline göre çağıran sayfadan gelir.
// Site geneli statik meta (description/OG/Twitter) index.html'de durur;
// burada yalnızca sekme/başlık düzeyinde geçersiz kılıyoruz.
function Seo({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />
    </Helmet>
  )
}

export default Seo
