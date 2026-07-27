import {defineType, defineField, defineArrayMember} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const sergi = defineType({
  name: 'sergi',
  title: 'Sergi',
  type: 'document',
  icon: CalendarIcon,
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
      title: 'Slug (kimlik)',
      type: 'slug',
      description:
        'Opsiyonel. Yalnızca özel açıklama gösterilecek sergiler için gerekir. ' +
        'Troya Atı sergisi için değeri "troya-atinin-sessizligi" olmalı. ' +
        'Türkçe başlıktan üretilir, dile göre değişmez.',
      options: {
        source: 'baslik.tr',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'object',
      options: {columns: 1},
      fields: [
        defineField({
          name: 'tr',
          title: 'Açıklama (Türkçe) — opsiyonel',
          type: 'text',
        }),
        defineField({
          name: 'en',
          title: 'Açıklama (English) — opsiyonel',
          type: 'text',
          description: 'Boş bırakırsanız bu dilde Türkçesi gösterilir.',
        }),
        defineField({
          name: 'it',
          title: 'Açıklama (Italiano) — opsiyonel',
          type: 'text',
          description: 'Boş bırakırsanız bu dilde Türkçesi gösterilir.',
        }),
      ],
    }),
    defineField({
      name: 'gorseller',
      title: 'Görseller',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    orderRankField({type: 'sergi'}),
  ],
  preview: {
    select: {
      title: 'baslik.tr',
      media: 'gorseller.0',
    },
  },
})
