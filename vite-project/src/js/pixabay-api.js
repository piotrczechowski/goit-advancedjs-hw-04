import axios from 'axios';

const API_KEY = '48010442-005cbb84b5a65166ca3b031bb';
const API_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}