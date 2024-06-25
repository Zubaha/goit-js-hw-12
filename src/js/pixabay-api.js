import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '44441755-66eac7c9e6ee4bab758e49d15',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
  },
});

export async function searchPhoto(query, currentPage) {
  const res = await axios.get('', {
    params: {
      q: query,
      page: currentPage,
    },
  });
  return res.data;
}
