
import './css/styles.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"

import { fetchSearchPicture } from './fetchSearchPicture';


const buttonLoadMoreEl = document.querySelector(".load-more")
const inputEl = document.querySelector("input")
const galleryEl = document.querySelector(".gallery")
const formEl = document.querySelector(".search-form")

buttonLoadMoreEl.style.visibility = "hidden"

let searchContent = ""
let page = 1
let perPage = 40



formEl.addEventListener("submit", searchPictures)

function searchPictures(e) {
  e.preventDefault()
  searchContent = inputEl.value.trim()
  galleryEl.innerHTML = '';

  if (searchContent !== "") {
  
  fetchSearchPicture(searchContent, page, perPage)
  .then(data => {
   if (data.hits.length === 0) {
   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  } else {
   galleryEl.innerHTML = ""
     insertPictureGalery(data.hits)
     lightbox.refresh()
     buttonLoadMoreEl.style.visibility = "visible"
     Notify.success(`Hooray! We found ${data.totalHits} images.`)
  }
})
  .catch(error => console.log(error))
}
else {
 galleryEl.innerHTML = ""
 Notify.info("Enter your request in the field")
  }
}

  const createPictureGalery = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="picture-card">
    <a href=${largeImageURL} class="gallery-item">
  <img src=${webformatURL} alt=${tags} loading="lazy" width="340" height="240"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
  </a>
</div> `

  const generatePictureGalery = (array) => array?.reduce((acc, item) => acc + createPictureGalery(item), "")

  const insertPictureGalery = (array) => {
      const result = generatePictureGalery(array)
      galleryEl.insertAdjacentHTML("beforeend", result)
  }

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
})

buttonLoadMoreEl.addEventListener("click", loadMore)
  
function loadMore () {
  page += 1;
  fetchSearchPicture(searchContent, page, perPage)
    .then(data => {
      if (data.hits.length < perPage) {
        Notify.info("We're sorry, but you've reached the end of search results.")
        insertPictureGalery(data.hits)
        lightbox.refresh()
        buttonLoadMoreEl.style.visibility = "hidden"
      }
      else {
        insertPictureGalery(data.hits)
        lightbox.refresh()
        buttonLoadMoreEl.style.visibility = "visible"
      }
    })
  .catch(error => console.log(error))
}
