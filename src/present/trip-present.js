import SortEventView from '../view/sort-event-trip-view.js';
// import InfoVeiw from '../view/info-trip-view';
import FilterView from '../view/filter-trip-view.js';
// import MessageVeiw from '../view/event-trip-msg-veiw';
import PointListView from '../view/event-list-view.js';
import PointItemView from '../view/event-item-point-view.js';
import FormEditView from '../view/event-item-point-edit-view.js';
import { render } from '../framework/render.js';

const tripFilterContainer = document.querySelector('.trip-controls__filters');

export default class TripPresenter {
  constructor({ tripContainer, pointModel }) {
    this.tripContainer = tripContainer;
    this.pointModel = pointModel; //все данные
    this.eventsListComponent = new PointListView();
  }

  //Инициализирует весь интерфейс
  init() {
    const points = this.pointModel.getPoints();// Получаем массив точек
    const destinations = this.pointModel.getDestinations();
    const offers = this.pointModel.getOffers();

    render(new FilterView(), tripFilterContainer);
    render(new SortEventView(), this.tripContainer);
    render(this.eventsListComponent, this.tripContainer);
    render(new FormEditView(points[2],destinations, offers), this.eventsListComponent.element);

    for (let i = 0; i < 3; i++) {
      const eventItemComponent = new PointItemView(points[i],destinations, offers);
      render(eventItemComponent, this.eventsListComponent.element);
    }
  }
}
