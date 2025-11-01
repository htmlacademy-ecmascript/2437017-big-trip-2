import { getRandomArrayElement } from '../utils.js';
import { nanoid } from 'nanoid';

export const mockPoints = [
  {
    type: 'taxi',
    destination: '2',
    dateFrom: '2019-12-01T07:30:56.845Z',
    dateTo: '2019-12-02T12:25:13.375Z',
    basePrice: 1100,
    isFavorite: false,
    offers: ['4', '5'],
  },
  {
    type: 'bus',
    destination: '1',
    dateFrom: '2019-12-01T07:30:56.845Z',
    dateTo: '2019-12-02T12:25:13.375Z',
    basePrice: 800,
    isFavorite: true,
    offers: ['6', '7'],
  },
  {
    type: 'drive',
    destination: '3',
    dateFrom: '2019-08-05T14:20:00.000Z',
    dateTo: '2019-08-05T18:30:00.000Z',
    basePrice: 500,
    isFavorite: false,
    offers: [],
  }
];

export function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}
