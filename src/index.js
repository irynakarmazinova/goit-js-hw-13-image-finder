import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';

// handlebars
import imageCardTpl from './templates/image-card.hbs';

// pnotify
import { defaultModules, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import '@pnotify/core/dist/BrightTheme.css'; //color theme for error

defaultModules.set(PNotifyMobile, {});

// refs
const formInputRef = document.getElementById('search-form');
const galleryListRef = document.getElementById('gallery-list');
// const loadMoreBtn = document.getElementById('my-element-selector');

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
// loadMoreBtn.refs.button.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
let endPoint = 0;

function setError(data) {
  const now = new Date().valueOf();
  console.log(now - endPoint);
  console.log(now);

  if (now > endPoint) {
    endPoint = now + data.delay + 1000;
    return error(data);
  }
}

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (!imagesApiService.query.trim()) {
    //при пробеле идет фетч, почему?
    // Запрос не должен отправляться при пустой строке ввода (или если просто использует пробел)

    return setError({
      title: `Please enter some value!`,
      delay: 500,
    });
  }

  // if () {
  // Кнопку "Load more" не нужно показывать когда картинок меньше или 12, а также когда картинки закончились
  loadMoreBtn.show();
  // }

  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImagesFn();
}
formInputRef.addEventListener('submit', onSearch);

function fetchImagesFn() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(hits => {
    renderImagesMarkup(hits);
    loadMoreBtn.enable();
  });
}
loadMoreBtn.refs.button.addEventListener('click', fetchImagesFn);

function renderImagesMarkup(hits) {
  // galleryListRef.insertAdjacentHTML('beforeend', imageCardTpl(hits));

  const markup = hits.reduce((acc, item) => {
    const el = `<li class='gallery-item'>
    <div class='photo-card'>

      <div class='gallery-image-box'>
        <img class='gallery-image' src='${item.webformatURL}' alt='${item.tags}' />
      </div>

      <div class='stats'>

        <p class='stats-item'>
          <i class='material-icons'>thumb_up</i>
          ${item.likes}
        </p>

        <p class='stats-item'>
          <i class='material-icons'>visibility</i>
          ${item.views}
        </p>

        <p class='stats-item'>
          <i class='material-icons'>comment</i>
          ${item.comments}
        </p>

        <p class='stats-item'>
          <i class='material-icons'>cloud_download</i>
          ${item.downloads}
        </p>

      </div>
    </div>
  </li>`;

    return `${acc} ${el}`;
  }, '');

  galleryListRef.innerHTML = markup;
}

function clearImagesContainer() {
  galleryListRef.innerHTML = '';
}

// --------------------------------------------------------------------------------
// Для того чтобы корректно работал плавный скролл необходимо зафиксировать высоту карточки.
// --------------------------------------------------------------------------------
// async function fn () {}

// const fn  = async function () {}

// const arr = async () => {}

// const x = {
//   async getname () {}
// }

// class X {
//   async getName () {}
// }
// --------------------------------------------------------------------------------
