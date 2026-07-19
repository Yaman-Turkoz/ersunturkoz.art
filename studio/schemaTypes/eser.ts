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
      type: 'string',
      validation: (rule) => rule.required(),
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
      type: 'text',
    }),
    defineField({
      name: 'yil',
      title: 'Yıl',
      type: 'number',
    }),
    defineField({
      name: 'teknik',
      title: 'Teknik',
      type: 'string',
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
      title: 'baslik',
      subtitle: 'seri.baslik',
      media: 'gorseller.0',
    },
  },
})
