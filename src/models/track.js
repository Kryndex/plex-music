// @flow

import { action } from 'mobx'
import Connection from 'stores/connection'
import Model from './model'

export default class Track extends Model {
  number: number;
  title: string;
  artistName: string;
  albumId: number;
  duration: number;
  path: string;
  url: string;

  @action static parse(item: any, connection: Connection): Track {
    const { uri, device } = connection
    const part = item.Media[0].Part[0]
    return new this(connection, {
      id: item.ratingKey,
      number: item.index,
      title: item.title.trim(),
      artistName: item.grandparentTitle.trim(),
      albumId: item.grandparentRatingKey,
      duration: item.duration,
      path: part.file,
      url: `${uri}${part.key}?X-Plex-Token=${encodeURIComponent(device.accessToken)}`,
    })
  }
}
