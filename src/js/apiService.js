// файл apiService.js с дефолтным экспортом объекта отвечающего за логику HTTP-запросов к API

import { BASE_URL, API_KEY } from './constants';

// export default function fetchImage(search) {
//   return fetch(
//     `${BASE_URL}?image_type=photo&orientation=horizontal&q=${search}&page=1&per_page=12&key=${API_KEY}`
//   ).then(response => {
//     return response.json();
//   });
// }

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    //   query - хранит сервис, котор отвечает за раб с API, а не внешний код
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
