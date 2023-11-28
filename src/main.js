"use strict"
import { showGallery, resetGallery } from "./js/gallery";
import { search } from "./js/searchPixabay";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import throttle from "lodash/throttle";

const elements = {
    request: document.querySelector("input[name=searchQuery]"),
    reqButton: document.querySelector("button[type=submit]"),
    guard: document.querySelector(".gallery__guard"),
}
const options = {
    root: null,
    rootMargin: "300px",
    threshold: 1.0,
}
const observer = new IntersectionObserver(loadMore, options);
let page = 1;
let totalHits = 0;

elements.reqButton.addEventListener("click", downloadPhotoesHandler);
elements.request.addEventListener("change", throttle(resetGallery, 3000));

observer.observe(elements.guard);

async function downloadPhotoesHandler(event){
    event.preventDefault();
    await downloadPhotoes();
    await iziToast.info({
        message:`Hooray! We found ${totalHits} images.`,
        position: 'topRight',
    })
}

async function downloadPhotoes(){
    try{
        let data = await search(elements.request.value, page);
        if (data.hits.length){
            showGallery(data.hits);
            totalHits = data.totalHits;
        } else {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight',
              }); 
        }
    } catch(error) {
        iziToast.error({
            message: `${error}`,
            position: 'topRight',
          });
    }
}

function loadMore(entity){
    entity.forEach(element => {
       if (element.isIntersecting && totalHits > 1){
        if (totalHits > (40 * page)){
            page += 1;
            downloadPhotoes();
        } else {
            iziToast.info({
                message:"We're sorry, but you've reached the end of search results.",
                position: 'topRight',
        })  
        }
        
       };
    });
}