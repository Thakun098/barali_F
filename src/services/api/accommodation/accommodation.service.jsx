import axios from "axios";
import AuthHeader from "../../common/AuthHeader";
const BASE_URL = import.meta.env.VITE_BASE_URL;


const getPopularAccommodation = () => {
    return axios.get(`${BASE_URL}/api/accommodation/popular`);
};
const getSearch = (destination, checkIn, checkOut, guests) => {
    // console.log("getSearch", destination, checkIn, checkOut, guest);
    return axios.get(`${BASE_URL}/api/accommodation/search`, {
        params: {
            destination,
            checkIn,
            checkOut,
            guests
        }
    });
};

const getPromotion = () => {
    return axios.get(`${BASE_URL}/api/accommodation/promotion`);
};

const getAll = () => {
    return axios.get(`${BASE_URL}/api/accommodation`, { headers: AuthHeader() });
};

const AccommodationService = {
    getPopularAccommodation,
    getPromotion,
    getAll,
    getSearch
}

export default AccommodationService;