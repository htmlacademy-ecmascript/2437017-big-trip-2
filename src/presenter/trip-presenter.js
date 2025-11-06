import PointPresenter from './/point-presenter.js';
import SortEventView from '../view/sort-event-trip-view.js';
import FilterView from '../view/filter-trip-view.js';
import PointListView from '../view/event-list-view.js';
import NoPointView from '../view/no-point-view.js';
import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils.js';
import { RenderPosition, SortType } from '../const.js';
import { sortingByPrice, sortingByDay, sortingByTime } from '../utils';


const tripFilterContainer = document.querySelector('.trip-controls__filters');
export default class TripPresenter {
  #tripContainer;
  #points;
  #destinations;
  #offers;

  #eventsListComponent = new PointListView();
  #filterComponent = new FilterView();

  #sortComponent = null;
  #currentSortType = SortType.DAY;

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

    remove(this.#sortComponent);
    this.#renderSort();
    this.#renderEventsList();
    this.#renderPoints(this.#points, this.#destinations, this.#offers);
  }

  #handlerPointChange = (updatePoint) => {
    this.#newPoints = updateItem (this.#newPoints, updatePoint);
    this.#collectionPointPresenter.get(updatePoint.id).init(updatePoint);
  };

  #resetAllPoints = () => {
    this.#collectionPointPresenter.forEach((tripPresenter) => tripPresenter.reset());
  };

  #clearPointsList() {
    this.#collectionPointPresenter.forEach((presenter) => presenter.destroy());
    this.#collectionPointPresenter.clear();
  }

  #renderFilters() {
    render(this.#filterComponent, tripFilterContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortEventView({
      onSortClick: this.#handleSortTypeChange,
      sortType: this.#currentSortType,
    });
    render(this.#sortComponent, this.#tripContainer, RenderPosition.BEFOREBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearSort();
    this.#renderSort();
    this.#switch(this.#currentSortType);
    this.#clearPointsList();
    this.#renderPoints(this.#newPoints, this.#destinations, this.#offers);
  };

  #switch = (type) => {
    switch (type) {
      case 'day':
        this.#newPoints.sort(sortingByDay);
        break;
      case 'price':
        this.#newPoints.sort(sortingByPrice);
        break;
      case 'time':
        this.#newPoints.sort(sortingByTime);
        break;
      default:
        this.#newPoints = [...this.#points];
    }
  };

  #clearSort() {
    if (this.#sortComponent) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
    }
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
        onCloseEdit: this.#resetAllPoints ,
      });
      pointPresenter.init();
      this.#collectionPointPresenter.set(points[i].id, pointPresenter);
    }
  }
}
