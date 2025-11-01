import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */const h="53000843-fe64c924bebc5f4f776b5f2a3",d="https://pixabay.com/api/",u=document.querySelector("#search-form"),i=document.querySelector(".gallery"),s=document.querySelector(".loader"),n=document.querySelector("#load-more"),m=new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});let l="",o=1;const c=20;u.addEventListener("submit",y);n.addEventListener("click",f);function y(t){t.preventDefault();const e=t.target.elements.searchQuery.value.trim();if(!e){iziToast.warning({message:"Please enter a search term!",position:"topRight"});return}l=e,o=1,i.innerHTML="",p()}function f(){o+=1,p()}function p(){s.style.display="block",n.style.display="none",g(l,o).then(t=>{if(s.style.display="none",t.hits.length===0&&o===1){iziToast.info({message:"No images found. Try another search term!",position:"topRight"});return}const e=b(t.hits);i.insertAdjacentHTML("beforeend",e),m.refresh();const a=Math.ceil(t.totalHits/c);o<a?n.style.display="block":(iziToast.info({message:"You've reached the end of search results!",position:"topRight"}),n.style.display="none")}).catch(()=>{s.style.display="none",iziToast.error({message:"Something went wrong. Please try again!",position:"topRight"})})}function g(t,e){const a=new URLSearchParams({key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:c,page:e});return fetch(`${d}?${a}`).then(r=>{if(!r.ok)throw new Error("HTTP Error: "+r.status);return r.json()})}function b(t){return t.map(e=>`
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
