const gallery = document.querySelector('.gallery');

export function showGallery(galleryItems){
    const imgsMarkup = galleryItems.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
        `
        <a class="gallery__link" href=${largeImageURL}>
            <div class="photo-card">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${downloads}
                    </p>
                </div>
            </div>
        </a>
        `)
        .join("");

    gallery.insertAdjacentHTML("beforeend", imgsMarkup);
}

export function resetGallery() {
    gallery.innerHTML = "";
}