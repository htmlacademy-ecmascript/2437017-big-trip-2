import { createElement } from '../render';

function createEventMessageTemplate() {
  return `<p class="trip-events__msg">Loading...</p>`;
}

export default class MessageVeiw {
  getTemplate() {
    return createEventMessageTemplate();
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
