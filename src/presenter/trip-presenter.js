import PointPresenter from './/point-presenter.js';
import SortEventView from '../view/sort-event-trip-view.js';
import FilterView from '../view/filter-trip-view.js';
import PointListView from '../view/event-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { render } from '../framework/render.js';


const tripFilterContainer = document.querySelector('.trip-controls__filters');
export default class TripPresenter {
  #tripContainer;
  #pointModel;
  #eventsListComponent;

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel; //все данные
    this.#eventsListComponent = new PointListView();
  }

  //Инициализирует весь интерфейс
  init() {
    this.#renderApp();
  }

  #renderFilters() {
    render(new FilterView(), tripFilterContainer);
  }

  #renderSort() {
    render(new SortEventView(), this.#tripContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#tripContainer);
  }

  #renderNoPoint() {
    render(new NoPointView(), this.#tripContainer);
  }

  #renderPoints (points, destinations, offers) {
    for (let i = 0; i < points.length; i++) {
      const pointPresenter = new PointPresenter ({
        container: this.#eventsListComponent,
        point: points[i],
        destinations,
        offers,
      });
      pointPresenter.init();
    }
  }

  #renderApp () {
    const points = this.#pointModel.points;
    const destinations = this.#pointModel.destinations;
    const offers = this.#pointModel.offers;

    this.#renderFilters();

    if(points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints(points, destinations, offers);
  }
}
