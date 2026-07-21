import {defineMigration, at, unset} from 'sanity/migrate'

// Şemadan kaldırılan alanların artık dokümanlarda taşıdığı veriyi temizler:
// - eser.yil
// - seri.aciklama
// Çalıştırma (studio/ dizininde):
//   npx sanity migration run remove-yil-aciklama            (dry-run, önizleme)
//   npx sanity migration run remove-yil-aciklama --no-dry-run   (uygula)
export default defineMigration({
  title: 'eser.yil ve seri.aciklama alanlarını kaldır',
  documentTypes: ['eser', 'seri'],
  migrate: {
    document(doc) {
      if (doc._type === 'eser' && doc.yil !== undefined) {
        return at('yil', unset())
      }
      if (doc._type === 'seri' && doc.aciklama !== undefined) {
        return at('aciklama', unset())
      }
      return undefined
    },
  },
})
