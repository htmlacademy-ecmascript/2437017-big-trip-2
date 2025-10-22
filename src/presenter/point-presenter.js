import PointItemView from '../view/event-item-point-view.js';
import FormEditView from '../view/event-item-point-edit-view.js';
import { render, replace } from '../framework/render.js';

export default class PointPresenter{

  #container;
  #point;
  #destinations;
  #offers;
  #pointComponent;
  #pointEditComponent;

  constructor({container, point, destinations, offers}){
    this.#container = container;
    this.#point = point; //объект
    this.#destinations = destinations;//массив
    this.#offers = offers; //массив
  }

  init() {
    this.#renderPoint();
  }

  #renderPoint () {

    const replaceCardToForm = () => {
      replace(this.#pointEditComponent, this.#pointComponent);
    };

    const replaceFormToCard = () => {
      replace(this.#pointComponent, this.#pointEditComponent);
    };

    this.#pointComponent = new PointItemView(this.#point, this.#destinations, this.#offers, handleOpenEdit);
    this.#pointEditComponent = new FormEditView(this.#point, this.#destinations, this.#offers, handleFormClose, handleFormSubmit);

    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape') {
        evt.preventDefault();
        //() ф-ции замена формы на картачку
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    // Внешние обработчики, передаваемые в конструкторы компонентов
    function handleOpenEdit () {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function handleFormSubmit () {
      // Здесь будет логика сохранения формы
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function handleFormClose () {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(this.#pointComponent, this.#container.element);
  }
}


