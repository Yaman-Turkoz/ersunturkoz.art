export const SITE_AYARLARI_QUERY = `
*[_id == "siteAyarlari"][0]{
  sanatciFotografi,
  heroEserGorseli
}
`

export const SERILER_ANASAYFA_QUERY = `
*[_type == "seri" && anasayfadaGoster == true] | order(orderRank asc) {
  _id,
  baslik,
  "slug": slug.current,
  kapakGorseli
}
`

export const SERI_DETAY_QUERY = `
*[_type == "seri" && slug.current == $slug][0]{
  _id,
  baslik,
  aciklama,
  kapakGorseli,
  "eserler": *[_type == "eser" && references(^._id)] | order(orderRank asc) {
    _id,
    baslik,
    gorseller,
    aciklama,
    yil,
    teknik
  }
}
`
