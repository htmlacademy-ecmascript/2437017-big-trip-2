import SortEventView from '../view/sort-event-trip-view.js';
// import InfoVeiw from '../view/info-trip-view';
import FilterView from '../view/filter-trip-view.js';
// import MessageVeiw from '../view/event-trip-msg-veiw';
import PointListView from '../view/event-list-view.js';
import PointItemView from '../view/event-item-view.js';
// import FormEditView from '../view/event-item-form-view.js';
import { render } from '../render.js';

const tripFilterContainer = document.querySelector('.trip-controls__filters');

export default class TripPresenter {
  constructor({ tripContainer, pointModel }) {
    this.tripContainer = tripContainer;
    this.pointModel = pointModel; //все данные
    this.eventsListComponent = new PointListView();
  }

  //Инициализирует весь интерфейс, вызывая три метода отрисовки
  init() {
    this.renderFilters();
    this.renderSorting();
    this.renderEventsList();
  }

  renderEventsList() {
    const points = this.pointModel.getPoints();// Получаем массив точек
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(this.eventsListComponent, this.tripContainer);

    for (let i = 0; i < 3; i++) {
      const eventItemComponent = new PointItemView(points[i],destinations, offers);
      render(eventItemComponent, this.eventsListComponent.getElement());
    }
  }

  renderFilters() {
    const filterComponent = new FilterView();
    render(filterComponent, tripFilterContainer);
  }

  renderSorting() {
    const sortingComponent = new SortEventView();
    render(sortingComponent, this.tripContainer);
  }
}
