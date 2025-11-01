import PointPresenter from './/point-presenter.js';
import SortEventView from '../view/sort-event-trip-view.js';
import FilterView from '../view/filter-trip-view.js';
import PointListView from '../view/event-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { render } from '../framework/render.js';
import { updateItem } from '../utils.js';


const tripFilterContainer = document.querySelector('.trip-controls__filters');
export default class TripPresenter {
  #tripContainer;
  #points;
  #destinations;
  #offers;

  #eventsListComponent = new PointListView();
  #filterComponent = new FilterView();
  #sortComponent = new SortEventView();
  #noPointComponent = new NoPointView();

  #newPoints = [];
  #collectionPointPresenter = new Map();

  constructor({ tripContainer, pointModel }) {
    this.#tripContainer = tripContainer;
    this.#points = pointModel.points;
    this.#destinations = pointModel.destinations;
    this.#offers = pointModel.offers;
  }

  //Инициализирует весь интерфейс
  init() {
    this.#newPoints = [...this.#points];
    this.#renderFilters();

    if(this.#points.length === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints(this.#points, this.#destinations, this.#offers);
  }

  #handlerPointChange = (updatePoint) => {
    this.#newPoints = updateItem (this.#newPoints, updatePoint);
    this.#collectionPointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #renderFilters() {
    render(this.#filterComponent, tripFilterContainer);
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#tripContainer);
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#tripContainer);
  }

  #renderPoints (points, destinations, offers) {
    for (let i = 0; i < points.length; i++) {
      const pointPresenter = new PointPresenter ({
        container: this.#eventsListComponent,
        point: points[i],
        destinations: destinations,
        offers: offers,
        onDataChange: this.#handlerPointChange,
      });
      pointPresenter.init();
      this.#collectionPointPresenter.set(points[i].id, pointPresenter);
    }
  }
}
