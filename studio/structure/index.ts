import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {StackIcon} from '@sanity/icons/Stack'
import {ImagesIcon} from '@sanity/icons/Images'

const ORDERABLE_TYPES = ['seri', 'eser']

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('İçerik')
    .items([
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
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !ORDERABLE_TYPES.includes(listItem.getId() as string),
      ),
    ])
