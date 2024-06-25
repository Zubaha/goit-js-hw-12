import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchPhoto } from './js/pixabay-api';
import { addPhoto } from './js/render-functions';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  input: document.querySelector('.input-search'),
  loader: document.querySelector('.loader'),
  listElem: document.querySelector('.gallery'),
  form: document.querySelector('.form'),
  btnLoadMore: document.querySelector('.button-loadmore'),
};

let query = '';
let currentPage = 1;
let maxPage = 1;
const perPage = 15;

refs.form.addEventListener('submit', async e => {
  e.preventDefault();
  query = refs.input.value.trim();

  if (query === '') {
    iziToast.show({
      message: 'Please put what you want to search!',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      titleColor: 'white',
    });
    return;
  }

  currentPage = 1;
  showLoader();
  hideLoadBtn();

  try {
    const data = await searchPhoto(query, currentPage);
    maxPage = Math.ceil(data.totalHits / perPage);

    if (data.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        titleColor: 'white',
      });
      hideLoader();
      updateBtnStatus();
      return;
    }

    const markup = addPhoto(data.hits);
    refs.listElem.innerHTML = markup;
  } catch (error) {
    iziToast.show({
      message: 'Something went wrong.',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      titleColor: 'white',
    });

    console.error('Error:', error);
  }
  hideLoader();
  updateBtnStatus();
  lightbox.refresh();
});

refs.btnLoadMore.addEventListener('click', async () => {
  currentPage++;
  hideLoadBtn();
  showLoader();

  try {
    const data = await searchPhoto(query, currentPage);
    const markup = addPhoto(data.hits);
    refs.listElem.insertAdjacentHTML('beforeend', markup);
    skipOldElement();
  } catch (error) {
    iziToast.show({
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      titleColor: 'white',
    });

    console.error('Error:', error);
  }
  hideLoader();
  updateBtnStatus();
  lightbox.refresh();
});

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadBtn();
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      backgroundColor: 'blue',
      messageColor: 'white',
      titleColor: 'white',
    });
  } else {
    showLoadBtn();
  }
}

function showLoadBtn() {
  refs.btnLoadMore.classList.remove('hidden');
}

function hideLoadBtn() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}

function skipOldElement() {
  const liElem = refs.listElem.children[0];
  const height = liElem.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
