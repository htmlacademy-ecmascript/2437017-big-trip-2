const POINT_COUNT = 3;

const DATE_FORMAT = {
  dayMonth: 'MMM D', // "Jul 10"
  hoursMinutes: 'HH:mm', // "22:55"
  fullDate: 'DD/MM/YY HH:mm', //"10/07/19 22:55"
};

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export {POINT_COUNT, RenderPosition, DATE_FORMAT, SortType};
