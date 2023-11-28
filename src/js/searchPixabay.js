import axios from "axios";
export function search(request, page = 1){
    const encodedRequest = encodeURIComponent(request).replace(/%20/g, '+');
    if (encodedRequest.length <= 100) {
        return axios.get('https://pixabay.com/api/',
            {
                params: {
                    key: "38056621-1e45eaa8a2746a320c832ca9a",
                    q: `${encodedRequest}`,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: "true",
                    per_page: "40",
                    page:`${page}`

                }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                throw error;
            });
    } else {
        throw new Error("Too much character in request");
    }
}