// import { createElement } from '../render.js';
import { humanizeDate } from '../utils.js';
import { DATE_FORMAT } from '../const.js';
import dayjs from 'dayjs';
import AbstractView from '../framework/view/abstract-view.js';


function createEventItemTemplate(point, destinations, offers) {

  const { type, dateFrom, dateTo, basePrice, isFavorite } = point;

  // Находим соотвествующий текущиму point destination по id
  const pointDestination = destinations.find((element) => element.id === point.destination);
  const destinationName = pointDestination ? pointDestination.name : '';

  // Находим соотвествующий текущиму point offers по type
  const offerType = offers.find((element) => element.type === point.type);
  const availableOffers = offerType ? offerType.offers : []; // получили массив offers
  const selectedOffers = availableOffers.filter((offer) => point.offers ? point.offers.includes(offer.id) : false);

  // если point.isFavorite вернет true, доб. class
  const favoritClassName = isFavorite ? 'event__favorite-btn--active' : '';

  //date/time
  const timeStart = humanizeDate(dateFrom, DATE_FORMAT.hoursMinutes);
  const timeEnd = humanizeDate(dateTo, DATE_FORMAT.hoursMinutes);
  const date = humanizeDate(dateFrom, DATE_FORMAT.dayMonth);

  const dateStart = dayjs.utc(dateFrom); // Парсим как UTC
  const dateEnd = dayjs.utc(dateTo); // Парсим как UTC
  const durationTime = dateEnd.diff(dateStart, 'm');

  function formatDuration(minutes) {
    const days = Math.floor(minutes / (24 * 60));
    const remainingHours = minutes % (24 * 60);
    const hours = Math.floor(remainingHours / 60);
    const mins = remainingHours % 60;

    if (days > 0) {
      return `${days}D ${hours}H ${mins}M`;
    } else if (hours > 0) {
      return `${hours}H ${mins}M`;
    } else {
      return `${mins}M`;
    }
  }

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${dateFrom}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationName}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${timeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${timeEnd}</time>
                  </p>
                  <p class="event__duration">${formatDuration(durationTime)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                ${selectedOffers.length > 0 ? `
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${selectedOffers.map((offer) => `
                  <li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>
                `).join('')}
                </ul>` : ''}
                <button class="event__favorite-btn ${favoritClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

/**
 * Представление элемента точки маршрута
 * @class PointItemView
 * @extends AbstractView
 */
export default class PointItemView extends AbstractView {
  /** @private */
  #point;
  /** @private */
  #destinations;
  /** @private */
  #offers;

  /**
   * Создает экземпляр представления точки маршрута
   * @param {object} point - данные точки маршрута
   * @param {object[]} destinations - массив направлений
   * @param {object[]} offers - массив типов предложений
   */

  constructor(point, destinations, offers) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  /**
   * Возвращает HTML-разметку элемента
   * @returns {string} HTML-разметка
  */

  get template() {
    return createEventItemTemplate(this.#point, this.#destinations, this.#offers);
  }

  // getElement() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }
  //   return this.element;
  // }

  // removeElement() {
  //   this.element = null;
  // }
}
