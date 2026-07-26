// Çok dilli bir alandan (örn. { tr, en, it }) aktif dildeki değeri döndürür.
// Aktif dil boş/eksikse Türkçe'ye (tr) düşer; hiçbiri yoksa boş string.
export function getLocalized(field, lang) {
  if (!field) return ''
  return field[lang] || field.tr || ''
}
