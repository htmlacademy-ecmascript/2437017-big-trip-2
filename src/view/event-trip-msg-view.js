// import { createElement } from '../render';
import AbstractView from '../framework/view/abstract-view.js';

function createEventMessageTemplate() {
  return `
  <p class="trip-events__msg">Loading...</p>`;
}

export default class MessageVeiw extends AbstractView {
  get template() {
    return createEventMessageTemplate();
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
