import TripPresenter from './present/trip-present.js';
import PointModel from './model/point-model.js';

const tripEventsContainer = document.querySelector('.trip-events'); // основной контейнер

const pointModel = new PointModel();
const tripPresenter = new TripPresenter({ tripContainer: tripEventsContainer, pointModel });
tripPresenter.init();
