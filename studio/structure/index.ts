import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {StackIcon} from '@sanity/icons/Stack'
import {ImagesIcon} from '@sanity/icons/Images'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {CogIcon} from '@sanity/icons/Cog'

const ORDERABLE_TYPES = ['seri', 'eser', 'sergi']
const SINGLETON_TYPES = ['siteAyarlari']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('İçerik')
    .items([
      S.listItem()
        .title('Site Ayarları')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteAyarlari')
            .documentId('siteAyarlari')
            .title('Site Ayarları'),
        ),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'seri',
        title: 'Seriler',
        icon: StackIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'eser',
        title: 'Eserler',
        icon: ImagesIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'sergi',
        title: 'Sergiler',
        icon: CalendarIcon,
        S,
        context,
      }),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !ORDERABLE_TYPES.includes(listItem.getId() as string) &&
          !SINGLETON_TYPES.includes(listItem.getId() as string),
      ),
    ])
