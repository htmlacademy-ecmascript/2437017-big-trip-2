import SortEventView from '../view/sort-event-trip-view.js';
// import InfoVeiw from '../view/info-trip-view';
import FilterView from '../view/filter-trip-view.js';
import NoPointMessage from '../view//no-point-view.js';
import PointListView from '../view/event-list-view.js';
import PointItemView from '../view/event-item-point-view.js';
import FormEditView from '../view/event-item-point-edit-view.js';
import { render, replace } from '../framework/render.js';

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
  #pointComponent;

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
    if (points.length === 0) {
      render(new NoPointMessage(), this.#tripContainer);
      return;
    }
    render(new SortEventView(), this.#tripContainer);
    render(this.#eventsListComponent, this.#tripContainer);

    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i],destinations, offers);
    }
  }

  #renderPoint (point, destinations, offers) {

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        //() ф-ции замена формы на картачку
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    // Внешние обработчики, передаваемые в конструкторы компонентов
    const handleOpenEdit = () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const handleFormSubmit = () => {
      // Здесь будет логика сохранения формы
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const handleFormClose = () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointComponent = new PointItemView(point, destinations, offers, handleOpenEdit);
    const pointEditComponent = new FormEditView(point, destinations, offers, handleFormClose, handleFormSubmit);

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#eventsListComponent.element);
  }
}
