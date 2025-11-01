const API_KEY = "53000843-fe64c924bebc5f4f776b5f2a3";
const BASE_URL = "https://pixabay.com/api/";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector("#load-more");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

let currentQuery = "";
let currentPage = 1;
const perPage = 20;

form.addEventListener("submit", handleSearch);
loadMoreBtn.addEventListener("click", handleLoadMore);

function handleSearch(e) {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: "Please enter a search term!",
      position: "topRight",
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  gallery.innerHTML = "";
  fetchAndRenderImages();
}

function handleLoadMore() {
  currentPage += 1;
  fetchAndRenderImages();
}

function fetchAndRenderImages() {
  loader.style.display = "block";
  loadMoreBtn.style.display = "none";

  fetchImages(currentQuery, currentPage)
    .then(data => {
      loader.style.display = "none";

      if (data.hits.length === 0 && currentPage === 1) {
        iziToast.info({
          message: "No images found. Try another search term!",
          position: "topRight",
        });
        return;
      }

      const markup = renderGallery(data.hits);
      gallery.insertAdjacentHTML("beforeend", markup);
      lightbox.refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);
      if (currentPage < totalPages) {
        loadMoreBtn.style.display = "block";
      } else {
        iziToast.info({
          message: "You've reached the end of search results!",
          position: "topRight",
        });
        loadMoreBtn.style.display = "none";
      }
    })
    .catch(() => {
      loader.style.display = "none";
      iziToast.error({
        message: "Something went wrong. Please try again!",
        position: "topRight",
      });
    });
}

function fetchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: perPage,
    page: page,
  });

  return fetch(`${BASE_URL}?${params}`).then(res => {
    if (!res.ok) throw new Error("HTTP Error: " + res.status);
    return res.json();
  });
}

function renderGallery(images) {
  return images
    .map(
      img => `
      <li class="gallery-item">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${img.likes}</p>
          <p><b>Views</b> ${img.views}</p>
          <p><b>Comments</b> ${img.comments}</p>
          <p><b>Downloads</b> ${img.downloads}</p>
        </div>
      </li>
    `
    )
    .join("");
}
