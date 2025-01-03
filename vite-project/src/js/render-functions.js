// render-functions.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showLoader(loader) {
  loader.style.display = 'block';
}

export function hideLoader(loader) {
  loader.style.display = 'none';
}

export function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function displayImages(images, gallery, lightbox) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
        <div class="info">
          <p>Likes: ${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
          <p>Downloads: ${downloads}</p>
        </div>
      </a>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
