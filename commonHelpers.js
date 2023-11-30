import{a as h,S as b,t as v,i as l}from"./assets/vendor-c1e9e7b2.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const p=document.querySelector(".gallery");function q(t){const r=t.map(({webformatURL:n,largeImageURL:s,tags:e,likes:o,views:i,comments:m,downloads:y})=>`
        <a class="gallery__link" href=${s}>
            <div class="photo-card">
                <img class="gallery__image" src="${n}" alt="${e}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${o}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${i}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${m}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${y}
                    </p>
                </div>
            </div>
        </a>
        `).join("");p.insertAdjacentHTML("beforeend",r)}function w(){p.innerHTML=""}async function _(t,r=1,n=40){const s=encodeURIComponent(t).replace(/%20/g,"+");if(s.length<=100)return await h.get("https://pixabay.com/api/",{params:{key:"38056621-1e45eaa8a2746a320c832ca9a",q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:JSON.stringify(n),page:`${r}`}});throw new Error("Too much character in request")}const a={request:document.querySelector("input[name=searchQuery]"),reqButton:document.querySelector("button[type=submit]"),guard:document.querySelector(".gallery__guard")};let L=new b(".gallery__link",{captionSelector:".gallery__image",captionsData:"alt",captionDelay:250});const S={root:null,rootMargin:"300px",threshold:1},d=new IntersectionObserver(P,S);let c=1,u=0;const g=40;a.reqButton.addEventListener("click",$);a.request.addEventListener("change",v(()=>{w(),c=1,d.unobserve(a.guard)},3e3));async function $(t){t.preventDefault(),a.request.value.trim()?(await f(),await l.info({message:`Hooray! We found ${u} images.`,position:"topRight"}),await d.observe(a.guard)):l.error({message:"Sorry, but you need to enter your request",position:"topRight"})}async function f(){try{const t=await _(a.request.value,c,g);console.log(t),t.data.hits.length?(q(t.data.hits),L.refresh(),u=t.data.totalHits):l.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"})}catch(t){l.error({message:`${t}`,position:"topRight"})}}function P(t){t.forEach(r=>{r.isIntersecting&&u>1&&(u>g*c?(c+=1,f()):(l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),d.unobserve(a.guard)))})}
//# sourceMappingURL=commonHelpers.js.map
