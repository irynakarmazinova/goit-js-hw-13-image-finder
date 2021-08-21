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

// basicLightbox
import * as basicLightbox from 'basiclightbox';

// refs
const formInputRef = document.getElementById('search-form');
const galleryListRef = document.getElementById('gallery-list');
const loadMoreBtnRef = document.getElementById('my-element-selector');

// instances
const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function setError(data) {
  const now = new Date().valueOf();
  let endPoint = 0;

  if (now > endPoint) {
    endPoint = now + data.delay + 1000;
    return error(data);
  }
}

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value;

  if (!imagesApiService.query.trim()) {
    return setError({
      title: `Please enter some value!`,
      delay: 500,
    });
  }

  // if () {
  // Кнопку не показывать когда картинки закончились
  loadMoreBtn.show();
  // }

  imagesApiService.resetPage();
  fetchImages();
  clearImagesContainer();
}
formInputRef.addEventListener('submit', onSearch);

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchPictures().then(hits => {
    renderImagesMarkup(hits);
    scrollImages();
    loadMoreBtn.enable();
    formInputRef.reset();
  });
}
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function allImages(totalHits) {
  // показывать лоад мор по условию, считаю сколько хитс всего имеет картинок
  // console.log({ totalHits });
}

function renderImagesMarkup(hits) {
  galleryListRef.insertAdjacentHTML('beforeend', imageCardTpl(hits));

  // const markup = hits.reduce((acc, item) => {
  //   const el = `<li class='gallery-item'>
  //   <div class='photo-card'>

  //     <div class='gallery-image-box'>
  //       <img class='gallery-image' src='${item.webformatURL}' alt='${item.tags}' />
  //     </div>

  //     <div class='stats'>

  //       <p class='stats-item'>
  //         <i class='material-icons'>thumb_up</i>
  //         ${item.likes}
  //       </p>

  //       <p class='stats-item'>
  //         <i class='material-icons'>visibility</i>
  //         ${item.views}
  //       </p>

  //       <p class='stats-item'>
  //         <i class='material-icons'>comment</i>
  //         ${item.comments}
  //       </p>

  //       <p class='stats-item'>
  //         <i class='material-icons'>cloud_download</i>
  //         ${item.downloads}
  //       </p>

  //     </div>
  //   </div>
  // </li>`;

  //   return `${acc} ${el}`;
  // }, '');

  // galleryListRef.insertAdjacentHTML('beforeend', markup);
}

function clearImagesContainer() {
  galleryListRef.innerHTML = '';
}

function scrollImages() {
  loadMoreBtnRef.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function showModal(image) {
  const instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery-image" src=${image} width="800" height="600">
    </div>
    `);
  instance.show();
  console.log('click');
}
// galleryListRef.addEventListener('click', showModal);

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
