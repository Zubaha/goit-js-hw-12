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

const input = document.querySelector('.input-search');
const loader = document.querySelector('.backdrop');
const listElem = document.querySelector('.gallery');
const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();
  loader.classList.remove('loader-hidden');
  const query = input.value;
  // setTimeout(() => {
  //   loader.classList.add('loader-hidden');
  // }, 1000);

  if (query.trim() === '') {
    iziToast.show({
      message: 'Please put what you want to search!',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',
      titleColor: 'white',
    });
    return;
  }
  searchPhoto(query)
    .then(data => {
      if (data.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white',
          titleColor: 'white',
        });
      }
      const markup = addPhoto(data);
      listElem.innerHTML = markup;
      lightbox.refresh();
      loader.classList.add('loader-hidden');
    })

    .catch(error => {
      iziToast.show({
        message: 'Something went wrong.',
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
        titleColor: 'white',
      });

      console.error('Error:', error);
    });
});
