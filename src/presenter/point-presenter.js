import PointItemView from '../view/event-item-point-view.js';
import FormEditView from '../view/event-item-point-edit-view.js';
import { remove, render, replace } from '../framework/render.js';

export default class PointPresenter{

  #container;
  #point;
  #destinations;
  #offers;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange;
  #updatePoint;
  #isOpenEdit = false;
  #handleClose;


  constructor({container, point, destinations, offers, onDataChange, onCloseEdit}){
    this.#container = container;
    this.#point = point; //объект
    this.#destinations = destinations;//массив
    this.#offers = offers; //массив
    this.#handleDataChange = onDataChange;
    this.#handleClose = onCloseEdit;
  }

  init(point) {

    if(point){
      // Обновляем данные
      this.#point = point;
    }

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointItemView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleOpenEdit,
      onFavoritClick: this.#handlePointChangle,
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClose: this.#handleCloseEdit,
      onSubmitClick: this.#handleFormSubmit
    });

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container.element);
      return;
    }

    if(prevPointComponent.element.parentElement){
      replace(this.#pointComponent, prevPointComponent);
    }

    if(prevPointEditComponent.element.parentElement){
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy () {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #handlePointChangle = () => {
    this.#updatePoint = {...this.#point,};
    this.#updatePoint.isFavorite = !this.#point.isFavorite;
    this.#handleDataChange(this.#updatePoint);
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      //() ф-ции замена формы на картачку
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#isOpenEdit = false;
    }
  };

  #handleOpenEdit = () => {
    this.#handleClose();
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = true;
  };

  #handleCloseEdit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#isOpenEdit = false;
  };

  reset = () => {
    if(this.#isOpenEdit) {
      this.#handleCloseEdit();
    }
  };

  #handleFormSubmit = () => {
    // Здесь будет логика сохранения формы
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}


