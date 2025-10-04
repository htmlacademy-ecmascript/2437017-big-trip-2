import {mockDestinations} from '../mock/destinations.js';
import {mockOffers} from '../mock/offers.js';
import {mockPoints} from '../mock/points.js';
import {POINT_COUNT} from '../const.js';
import {getRandomArrayElement} from '../utils.js';

/*создаем класс который описывает структуру модели, в котором хранятся данные. Предоставляет методы для управления данными*/
export default class PointModel {
  constructor() {
    this.points = Array.from({ length: POINT_COUNT }, () => getRandomArrayElement(mockPoints));
    this.destinations = mockDestinations;
    this.offers = mockOffers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
