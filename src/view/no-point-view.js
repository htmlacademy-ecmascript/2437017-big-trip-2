import AbstractView from '../framework/view/abstract-view.js';

function createEventMessageTemplate() {
  return `
  <p class="trip-events__msg">Click New Event to create your first point</p>`;
}

export default class NoPointMessage extends AbstractView {
  get template() {
    return createEventMessageTemplate();
  }
}
