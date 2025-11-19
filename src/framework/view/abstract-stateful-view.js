import AbstractView from './abstract-view.js';

/**
 * Абстрактный класс представления с состоянием
 */
export default class AbstractStatefulView extends AbstractView {
  /** @type {Object} Объект состояния */
  _state = {};

  /**
   * Метод для обновления состояния и перерисовки элемента
   * @param {Object} update Объект с обновлённой частью состояния
   */
  updateElement(update) {
    if (!update) {
      return;
    }
    this._setState(update);

    this.#rerenderElement();
  }

  /**
   * Метод для восстановления обработчиков после перерисовки элемента
   * @abstract
   */
  _restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  /**
   * Метод для обновления состояния
   * @param {Object} update Объект с обновлённой частью состояния
   */
  _setState(update) {
    console.log('1 ', update);
    console.log('2 до _state ', this._state);
    this._state = structuredClone({...this._state, ...update});
    console.log('3 после _state ', this._state);
  }

  /** Метод для перерисовки элемента */
  #rerenderElement() {
    // ШАГ 1: Сохраняем текущий элемент
    // this.element возвращает существующий элемент li
    const prevElement = this.element;

    const parent = prevElement.parentElement; //ul

    // ШАГ 2: Удаляем элемент из DOM и очищаем внутреннюю ссылку
    // Теперь this.element = null
    this.removeElement();

    const newElement = this.element; //Новый элемент (после удаления) c актуальным состоянием

    //заменить один дочерний узел указанного узла другим
    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }
}
