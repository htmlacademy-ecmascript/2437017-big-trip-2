import SortEventView from '../view/sort-event-trip-view.js';
// import InfoVeiw from '../view/info-trip-view';
import FilterView from '../view/filter-trip-view.js';
// import MessageVeiw from '../view/event-trip-msg-veiw';
import PointListView from '../view/event-list-view.js';
import PointItemView from '../view/event-item-point-view.js';
import FormEditView from '../view/event-item-point-edit-view.js';
import { render } from '../framework/render.js';

const tripFilterContainer = document.querySelector('.trip-controls__filters');

/**
 * Презентер для управления отображением путешествия
 * Отвечает за рендеринг точек маршрута, фильтров и сортировки
 * @class TripPresenter
 */
export default class TripPresenter {
  /** @private */
  #tripContainer;
  /** @private */
  #pointModel;
  /** @private */
  #eventsListComponent;
  #eventItemComponent;

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel; //все данные
    this.#eventsListComponent = new PointListView();
  }

  //Инициализирует весь интерфейс
  init() {
    const points = this.#pointModel.points;// Получаем массив точек
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    render(new FilterView(), tripFilterContainer);
    render(new SortEventView(), this.#tripContainer);
    render(this.#eventsListComponent, this.#tripContainer);
    render(new FormEditView(points[2],destinations, offers), this.#eventsListComponent.element);

    for (let i = 0; i < 3; i++) {
      // const eventItemComponent = new PointItemView(points[i],destinations, offers);
      this.#renderPoint(points[i],destinations, offers);
      // render(eventItemComponent, this.#eventsListComponent.element);
    }
  }

  #renderPoint (point, destinations, offers) {
    this.#eventItemComponent = new PointItemView(point, destinations, offers);
    render(this.#eventItemComponent, this.#eventsListComponent.element);
  }
}
