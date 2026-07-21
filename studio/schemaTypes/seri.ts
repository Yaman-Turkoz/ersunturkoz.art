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
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'baslik',
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
      title: 'baslik',
      media: 'kapakGorseli',
    },
  },
})
