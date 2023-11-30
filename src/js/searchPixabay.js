import axios from "axios";
export async function search(request, page = 1, photoPerPage = 40){
    const encodedRequest = encodeURIComponent(request).replace(/%20/g, '+');
    if (encodedRequest.length <= 100) {
        return await axios.get('https://pixabay.com/api/',
            {
                params: {
                    key: "38056621-1e45eaa8a2746a320c832ca9a",
                    q: `${encodedRequest}`,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: "true",
                    per_page: JSON.stringify(photoPerPage),
                    page:`${page}`

                }
            });
    } else {
        throw new Error("Too much character in request");
    }
}