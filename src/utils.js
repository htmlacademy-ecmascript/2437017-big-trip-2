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

function sortingByDay(a, b) {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateA - dateB;
}

function sortingByPrice(a, b) {
  return b.basePrice - a.basePrice;
}

function sortingByTime(a, b) {
  const dateA = dayjs(a.dateFrom).valueOf();
  const dateB = dayjs(b.dateFrom).valueOf();
  return dateB - dateA;
}

export {getRandomArrayElement, humanizeDate, updateItem,sortingByDay,sortingByPrice,sortingByTime};

