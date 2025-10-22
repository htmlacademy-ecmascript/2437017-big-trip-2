const POINT_COUNT = 4;

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

export {POINT_COUNT, RenderPosition, DATE_FORMAT};
