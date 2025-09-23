import { createElement } from '../render';

function createEventItemTemplate() {
  return `
  <ul class="trip-events__list"></ul>`;
}

export default class TripPointItemView {
  getTemplate() {
    return createEventItemTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
