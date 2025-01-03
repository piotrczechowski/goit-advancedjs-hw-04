// main.js
import { fetchImages } from './js/pixabay-api.js';
import { showLoader, hideLoader, showError, clearGallery, displayImages } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const input = document.querySelector('#search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(loader);

let lightbox = new SimpleLightbox('.gallery a');
let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = input.value.trim();
  if (!query) {
    showError('Please enter a search query.');
    return;
  }
  page = 1;
  clearGallery(gallery);
  loadMoreBtn.style.display = 'none';
  try {
    showLoader(loader);
    const { images, total } = await fetchImages(query, page, perPage);
    totalHits = total;
    hideLoader(loader);
    if (images.length === 0) {
      showError('No results found.');
      return;
    }
    displayImages(images, gallery, lightbox);
    if (page * perPage < totalHits) loadMoreBtn.style.display = 'block';
  } catch {
    hideLoader(loader);
    showError('Error fetching images.');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  try {
    showLoader(loader);
    const { images } = await fetchImages(query, page, perPage);
    hideLoader(loader);
    displayImages(images, gallery, lightbox);
    setTimeout(() => {
      smoothScroll(); // Wywołanie po dodaniu nowych obrazów
    }, 200); // Delay to ensure images are rendered before scrolling
    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      showError("You've reached the end of the results.");
    }
  } catch {
    hideLoader(loader);
    showError('Error loading more images.');
  }
});

function smoothScroll() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}
