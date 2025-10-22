import AbstractView from '../framework/view/abstract-view.js';

function createEventMessageTemplate() {
  return `
  <p class="trip-events__msg">Loading...</p>`;
}

export default class MessageView extends AbstractView {
  get template() {
    return createEventMessageTemplate();
  }

}
