// файл apiService.js с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API

import { BASE_URL, API_KEY } from './constants';

export default function fetchImage(search) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${search}&page=1&per_page=12&key=${API_KEY}`
  ).then(response => {
    return response.json();
  });
}
