import axios from 'axios';

const KEY = '30084987-2bae9607d8c7414f71191ed2a';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotos = (pictureName, page = 1) => {
  return axios.get(
    `${BASE_URL}/?key=${KEY}&q=${pictureName}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
};
