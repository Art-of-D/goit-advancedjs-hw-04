"use strict"
import { showGallery, resetGallery } from "./js/gallery";
import { search } from "./js/searchPixabay";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import throttle from "lodash/throttle";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const elements = {
    request: document.querySelector("input[name=searchQuery]"),
    reqButton: document.querySelector("button[type=submit]"),
    guard: document.querySelector(".gallery__guard"),
}
let zoomedImg = new SimpleLightbox('.gallery__link', {
    captionSelector: '.gallery__image',
    captionsData:'alt',
    captionDelay: 250,
});
const options = {
    root: null,
    rootMargin: "300px",
    threshold: 1.0,
}
const observer = new IntersectionObserver(loadMore, options);
let page = 1;
let totalHits = 0;
const photoPerPage = 40;

elements.reqButton.addEventListener("click", downloadPhotoesHandler);
elements.request.addEventListener("change", throttle(()=>{
    resetGallery();
    page = 1;
    observer.unobserve(elements.guard);
}
    , 3000));

async function downloadPhotoesHandler(event){
    event.preventDefault();
    if (elements.request.value.trim()){
        await downloadPhotoes();
        await iziToast.info({
            message:`Hooray! We found ${totalHits} images.`,
            position: 'topRight',
        });
        await observer.observe(elements.guard);
    } else {
        iziToast.error({
            message: "Sorry, but you need to enter your request",
            position: 'topRight',
          });
    }
    
}

async function downloadPhotoes(){  
    try{
        const response = await search(elements.request.value, page, photoPerPage);
        console.log(response);
        if (response.data.hits.length){
            showGallery(response.data.hits);
            zoomedImg.refresh();
            totalHits = response.data.totalHits;
            
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
        if (totalHits > (photoPerPage * page)){
            page += 1;
            downloadPhotoes();
        } else {
            iziToast.info({
                message:"We're sorry, but you've reached the end of search results.",
                position: 'topRight',
        });
            observer.unobserve(elements.guard);  
        }
        
       };
    });
}