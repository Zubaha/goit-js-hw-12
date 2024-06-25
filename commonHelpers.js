import{A as L,S as C,i as n}from"./assets/vendor-b41355b7.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const E=L.create({baseURL:"https://pixabay.com/api/",params:{key:"44441755-66eac7c9e6ee4bab758e49d15",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15}});async function g(o,e){return(await E.get("",{params:{q:o,page:e}})).data}function f(o){return o==null?void 0:o.map(({webformatURL:e,largeImageURL:s,tags:c,likes:t,views:r,comments:a,downloads:w})=>`
      <li class="photo-card">
      <a href='${s}' class="big-photo">
  <img class="photo" src="${e}" alt="${c}" loading="lazy" />
  <ul class="info">
    <li class="info-item">
      <b>Likes</b>
      ${t}
    </li>
    <li class="info-item">
      <b>Views</b>
${r}
    </li>
    <li class="info-item">
      <b>Comments</b>
      ${a}
    </li>
    <li class="info-item">
      <b>Downloads</b>
      ${w}
    </li>
  </ul>
  </a>
</li>   
`).join("")}const p=new C(".gallery a",{captionsData:"alt",captionDelay:250}),i={input:document.querySelector(".input-search"),loader:document.querySelector(".loader"),listElem:document.querySelector(".gallery"),form:document.querySelector(".form"),btnLoadMore:document.querySelector(".button-loadmore")};let d="",l=1,y=1;const S=15;i.form.addEventListener("submit",async o=>{if(o.preventDefault(),d=i.input.value.trim(),d===""){n.show({message:"Please put what you want to search!",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"});return}l=1,b(),m();try{const e=await g(d,l);if(y=Math.ceil(e.totalHits/S),e.length===0){n.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"}),h(),u();return}const s=f(e.hits);i.listElem.innerHTML=s}catch(e){n.show({message:"Something went wrong.",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"}),console.error("Error:",e)}h(),u(),p.refresh()});i.btnLoadMore.addEventListener("click",async()=>{l++,m(),b();try{const o=await g(d,l),e=f(o.hits);i.listElem.insertAdjacentHTML("beforeend",e),v()}catch(o){n.show({message:"Something went wrong while loading more images.",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"}),console.error("Error:",o)}h(),u(),p.refresh()});function u(){l>=y?(m(),n.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"blue",messageColor:"white",titleColor:"white"})):P()}function P(){i.btnLoadMore.classList.remove("hidden")}function m(){i.btnLoadMore.classList.add("hidden")}function b(){i.loader.classList.remove("hidden")}function h(){i.loader.classList.add("hidden")}function v(){const e=i.listElem.children[0].getBoundingClientRect().height;scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
