
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

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function displayImages(images, gallery, lightbox) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy">
        <div class="info">
          <p><strong>Likes:</strong> ${likes}</p>
          <p><strong>Views:</strong> ${views}</p>
          <p><strong>Comments:</strong> ${comments}</p>
          <p><strong>Downloads:</strong> ${downloads}</p>
        </div>
      </a>
    `)
    .join('');
  
  gallery.insertAdjacentHTML('beforeend', markup); // Dodajemy nowe elementy, a nie zastępujemy istniejące
  lightbox.refresh(); // Aktualizacja SimpleLightbox
}