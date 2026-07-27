import {defineType, defineField, defineArrayMember} from 'sanity'
import {ImagesIcon} from '@sanity/icons/Images'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export const eser = defineType({
  name: 'eser',
  title: 'Eser',
  type: 'document',
  icon: ImagesIcon,
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
      name: 'teknik',
      title: 'Teknik',
      type: 'string',
    }),
    defineField({
      name: 'durum',
      title: 'Durum (satış)',
      type: 'string',
      initialValue: 'available',
      options: {
        layout: 'dropdown',
        list: [
          {value: 'available', title: 'Koleksiyona Açık (satışta)'},
          {value: 'artist', title: 'Sanatçı Koleksiyonunda (satışta)'},
          {value: 'private', title: 'Özel Koleksiyonda (satışta değil)'},
          {value: 'museum', title: 'Müze Koleksiyonunda (satışta değil)'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seri',
      title: 'Seri',
      type: 'reference',
      to: [{type: 'seri'}],
      validation: (rule) => rule.required(),
    }),
    orderRankField({type: 'eser'}),
  ],
  preview: {
    select: {
      title: 'baslik.tr',
      subtitle: 'seri.baslik.tr',
      media: 'gorseller.0',
    },
  },
})
