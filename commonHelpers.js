import{S as h,a as m,t as y,i}from"./assets/vendor-d1cd76a9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const d=document.querySelector(".gallery");function b(t){const r=t.map(({webformatURL:a,largeImageURL:n,tags:e,likes:o,views:s,comments:f,downloads:g})=>`
        <a class="gallery__link" href=${n}>
            <div class="photo-card">
                <img class="gallery__image" src="${a}" alt="${e}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${o}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${s}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${f}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${g}
                    </p>
                </div>
            </div>
        </a>
        `).join("");d.insertAdjacentHTML("beforeend",r),new h(".gallery__link",{captionSelector:".gallery__image",captionsData:"alt",captionDelay:250})}function q(){d.innerHTML=""}function v(t,r=1){const a=encodeURIComponent(t).replace(/%20/g,"+");if(a.length<=100)return m.get("https://pixabay.com/api/",{params:{key:"38056621-1e45eaa8a2746a320c832ca9a",q:`${a}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:"40",page:`${r}`}}).then(function(n){return n.data}).catch(function(n){throw console.log(n),n});throw new Error("Too much character in request")}const c={request:document.querySelector("input[name=searchQuery]"),reqButton:document.querySelector("button[type=submit]"),guard:document.querySelector(".gallery__guard")},w={root:null,rootMargin:"300px",threshold:1},_=new IntersectionObserver($,w);let u=1,l=0;c.reqButton.addEventListener("click",L);c.request.addEventListener("change",y(q,3e3));_.observe(c.guard);async function L(t){t.preventDefault(),await p(),await i.info({message:`Hooray! We found ${l} images.`,position:"topRight"})}async function p(){try{let t=await v(c.request.value,u);t.hits.length?(b(t.hits),l=t.totalHits):i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"})}catch(t){i.error({message:`${t}`,position:"topRight"})}}function $(t){t.forEach(r=>{r.isIntersecting&&l>1&&(l>40*u?(u+=1,p()):i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))})}
//# sourceMappingURL=commonHelpers.js.map
