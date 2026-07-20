import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteAyarlari = defineType({
  name: 'siteAyarlari',
  title: 'Site Ayarları',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'sanatciFotografi',
      title: 'Sanatçı Fotoğrafı',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroEserGorseli',
      title: 'Hero Eser Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Ayarları'}
    },
  },
})
