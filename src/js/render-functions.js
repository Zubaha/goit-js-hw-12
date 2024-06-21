export function addPhoto(photos) {
  return photos
    ?.map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="photo-card">
      <a href='${largeImageURL}' class="big-photo">
  <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <ul class="info">
    <li class="info-item">
      <b>Likes</b>
      ${likes}
    </li>
    <li class="info-item">
      <b>Views</b>
${views}
    </li>
    <li class="info-item">
      <b>Comments</b>
      ${comments}
    </li>
    <li class="info-item">
      <b>Downloads</b>
      ${downloads}
    </li>
  </ul>
  </a>
</li>   
`
    )
    .join('');
}
