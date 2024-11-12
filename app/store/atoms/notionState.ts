import { atom } from 'recoil';
import { ExtendedRecordMap } from 'notion-types';

export interface INotionIdState {
  pageId: string;
}

export const notionIdState = atom<INotionIdState>({
  key: 'notionId',
  default: {
    pageId: '',
  },
});

export const recordMapState = atom<ExtendedRecordMap | null>({
  key: 'recordMap',
  default: null,
}); 
