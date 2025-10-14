// import { createElement } from '../render';
import AbstractView from '../framework/view/abstract-view.js';

function createEventListTemplate() {
  return `
  <ul class="trip-events__list"></ul>`;
}

export default class PointListVeiw extends AbstractView {
  get template() {
    return createEventListTemplate();
  }

  // getElement() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }
  //   return this.element;
  // }

  // removeElement() {
  //   this.element = null;
  // }
}
