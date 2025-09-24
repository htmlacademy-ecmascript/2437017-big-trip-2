import SortEventView from '../veiw/sort-event-trip-view';
// import InfoVeiw from '../veiw/info-trip-view';
import FilterVeiw from '../veiw/filter-trip-view';
// import MessageVeiw from '../veiw/event-trip-msg-veiw';
import PointListVeiw from '../veiw/event-list-view';
import PointItemVeiw from '../veiw/event-item-view';
import FormEditVeiw from '../veiw/event-item-form-veiw';
import { render, RenderPosition } from '../render.js';

//Конструктор принимает контейнеры для разных частей интерфейса
export default class TripPresenter {
  constructor({ tripControlsContainer, tripEventsContainer }) {
    this._tripControlsContainer = tripControlsContainer; // контейнер для фильтров
    this._tripEventsContainer = tripEventsContainer; //контейнер для событий и сортировки
  }

  //Инициализирует весь интерфейс, вызывая три метода отрисовки
  init() {
    this.renderFilters();
    this.renderSorting();
    this.renderEventsList();
  }

  //Создает компонент фильтров и вставляет его в конец контейнера управляющих элементов
  renderFilters() {
    const filterComponent = new FilterVeiw();
    render(filterComponent, this._tripControlsContainer, RenderPosition.BEFOREEND);
  }

  //Создает компонент сортировки и вставляет его в конец контейнера событий
  renderSorting() {
    const sortingComponent = new SortEventView();
    render(sortingComponent, this._tripEventsContainer, RenderPosition.BEFOREEND);
  }

  renderEventsList() {
    // 1. Создаем контейнер для списка событий
    const eventsListComponent = new PointListVeiw();
    render(eventsListComponent, this._tripEventsContainer, RenderPosition.BEFOREEND);

    // 2. Получаем DOM-элемент контейнера
    const eventListContainer = eventsListComponent.getElement();

    // 3. Добавляем форму редактирования в НАЧАЛО списка
    const formEditPointComponent = new FormEditVeiw();
    render(formEditPointComponent, eventListContainer, RenderPosition.AFTERBEGIN);

    // 4. Добавляем 3 карточки событий в КОНЕЦ списка
    for (let i = 0; i < 3; i++) {
      const eventItemComponent = new PointItemVeiw();
      render(eventItemComponent, eventListContainer, RenderPosition.BEFOREEND);
    }
  }
}
