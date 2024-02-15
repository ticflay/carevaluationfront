import api from "./config/api"

export const getYears = async () => {
    const response = await api.get(`?cmd=getYears`);
    return {min_year: response.data.Years.min_year, max_year: response.data.Years.max_year};
}