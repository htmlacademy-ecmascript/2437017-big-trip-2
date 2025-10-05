import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

dayjs.extend(utc);
function humanizeDate(date, formatPattern) {

  return date ? dayjs.utc(date).format(formatPattern) : '';
}

export {getRandomArrayElement, humanizeDate};

