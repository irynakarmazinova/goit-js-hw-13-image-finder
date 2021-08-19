import fetchImage from './js/apiService';

import imageCardTpl from './templates/image-card.hbs';
import loadMoreTpl from './templates/load-more.hbs';

// refs
const formInputRef = document.getElementById('search-form');
const galleryListRef = document.getElementById('gallery-list');
const galleryBoxRef = document.getElementById('gallery-box');
const element = document.getElementById('my-element-selector'); //нет такого элемента для плавного скрола

function onInput(e) {
  e.preventDefault();

  const form = e.currentTarget; //сама форма в доме
  const searchQuery = form.elements.query.value; //именно те буквы, что ввели в форму

  if (form !== '' || e.keyCode !== 32) {
    fetchImage(searchQuery)
      .then(data => {
        renderImage(data);

        // if()
      })
      .catch(err => console.error(err.message))
      .finally(() => formInputRef.reset());
  }
}
formInputRef.addEventListener('submit', onInput);

function renderImage(image) {
  const markup = imageCardTpl(image);
  galleryListRef.innerHTML = markup;
}

function renderLoadMoreBtn() {
  const markup = loadMoreTpl(image);
  galleryBoxRef.insertAdjacentHTML('beforeend', markup);
}

// увеличение страницы
function incrementPage() {
  this.page += 1;
}

// сброс страницы
function resetPage() {
  this.page = 1;
}

// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
// --------------------------------------------------------------------------------
// Для того чтобы корректно работал плавный скролл необходимо зафиксировать высоту карточки.
// Кнопку "Load more" не нужно показывать когда картинок меньше или 12, а также когда картинки закончились
// Запрос не должен отправляться при при пустой строке ввода (или если просто использует пробел)
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
