// Import necessary libraries
import { fetchImages } from './js/pixabay-api.js';
import { showLoader, hideLoader, showError, clearGallery, displayImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Select DOM elements
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a');

// Form submission handler
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    showError('Please enter a search query.');
    return;
  }

  fetchImages(query).then(images => {
    if (images.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
      return;
    }
    clearGallery();
    displayImages(images, gallery, lightbox);
  }).catch(() => {
    showError('Failed to fetch images. Please try again later.');
  });
});
