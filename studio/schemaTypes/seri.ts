import {defineType, defineField} from 'sanity'
import {StackIcon} from '@sanity/icons/Stack'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const seri = defineType({
  name: 'seri',
  title: 'Seri',
  type: 'document',
  icon: StackIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'baslik',
      title: 'Başlık',
      type: 'object',
      options: {columns: 1},
      fields: [
        defineField({
          name: 'tr',
          title: 'Başlık (Türkçe)',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'Başlık (English) — opsiyonel',
          type: 'string',
          description: 'Boş bırakırsanız bu dilde Türkçesi gösterilir.',
        }),
        defineField({
          name: 'it',
          title: 'Başlık (Italiano) — opsiyonel',
          type: 'string',
          description: 'Boş bırakırsanız bu dilde Türkçesi gösterilir.',
        }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Türkçe başlıktan otomatik üretilir; dile göre değişmez.',
      options: {
        source: 'baslik.tr',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kapakGorseli',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'anasayfadaGoster',
      title: 'Anasayfada Göster',
      type: 'boolean',
      initialValue: true,
    }),
    orderRankField({type: 'seri'}),
  ],
  preview: {
    select: {
      title: 'baslik.tr',
      media: 'kapakGorseli',
    },
  },
})
