import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */const d="53000843-fe64c924bebc5f4f776b5f2a3",y="https://pixabay.com/api/",h=document.querySelector("#search-form"),i=document.querySelector(".gallery"),s=document.querySelector(".loader"),o=document.querySelector("#load-more"),m=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});let l="",a=1;const c=20;h.addEventListener("submit",u);o.addEventListener("click",f);async function u(t){t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e){iziToast.warning({message:"Please enter a search term!",position:"topRight"});return}l=e,a=1,i.innerHTML="",await p()}async function f(){a+=1,await p()}async function p(){s.style.display="block",o.style.display="none";try{const t=await g(l,a);if(s.style.display="none",t.hits.length===0&&a===1){iziToast.info({message:"No images found. Try another search term!",position:"topRight"});return}const e=b(t.hits);i.insertAdjacentHTML("beforeend",e),m.refresh();const r=Math.ceil(t.totalHits/c);a<r?o.style.display="block":(iziToast.info({message:"You've reached the end of search results!",position:"topRight"}),o.style.display="none")}catch(t){s.style.display="none",iziToast.error({message:"Something went wrong. Please try again!",position:"topRight"}),console.error("Fetch error:",t)}}async function g(t,e){const r=new URLSearchParams({key:d,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:c,page:e}),n=await fetch(`${y}?${r}`);if(!n.ok)throw new Error("HTTP Error: "+n.status);return await n.json()}function b(t){return t.map(e=>`
      <li class="gallery-item">
        <a href="${e.largeImageURL}">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${e.likes}</p>
          <p><b>Views</b> ${e.views}</p>
          <p><b>Comments</b> ${e.comments}</p>
          <p><b>Downloads</b> ${e.downloads}</p>
        </div>
      </li>
    `).join("")}
//# sourceMappingURL=page-2.js.map
