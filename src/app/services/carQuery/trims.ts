import api from "./config/api"

export const getTrims = async () => {
    try {
        const response = await api.get(`?cmd=getTrims`)
        return response.data;
    }catch{
        return [];
    }
}

