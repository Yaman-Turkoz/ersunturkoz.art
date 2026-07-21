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
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aciklama',
      title: 'Açıklama',
      type: 'text',
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
      title: 'baslik',
      media: 'gorseller.0',
    },
  },
})
