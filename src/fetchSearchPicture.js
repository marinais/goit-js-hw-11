
import axios from "axios";
export {fetchSearchPicture}
const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "29365894-012822036d68015f86d068800"

async function fetchSearchPicture(searchContent, page, perPage) {
    try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchContent}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`);
    // if (!response.ok) {
    //   throw new Error(response.status);
    // }
    return response.data;
  } catch (error) {
    return console.log(error);
  }
}