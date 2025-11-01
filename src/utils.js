import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function updateItem (items, updatedItem) {
  return items.map((item) => item.id === updatedItem.id ? updatedItem : item);
}

dayjs.extend(utc);
function humanizeDate(date, formatPattern) {

  return date ? dayjs.utc(date).format(formatPattern) : '';
}

export {getRandomArrayElement, humanizeDate, updateItem};

