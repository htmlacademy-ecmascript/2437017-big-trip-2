// import { createElement } from '../render.js';
import AbstractView from '../framework/view/abstract-view.js';

function createInfoBlock() {
  return ` <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>`;
}

export default class InfoVeiw extends AbstractView {
  get template() {
    return createInfoBlock();
  }


  // getElement() {
  //   if(!this.element) {
  //     this.element = createElement(this.getBlock());
  //   }

  //   return this.element;
  // }

  // removeElement() {
  //   this.element = null;
  // }
}
