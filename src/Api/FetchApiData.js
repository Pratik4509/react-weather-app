import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "8df5e5a1fe5f40b347a5a1533843d1d2";

export const fetchweather = async(query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: "metric",
            APPID: API_KEY,
        },
    });
    return data;
};