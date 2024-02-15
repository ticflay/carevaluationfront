import api from "./config/api"

export const getModels = async (year: number, maker: string) => {
    try {
        const response = await api.get(`?cmd=getModels&year=${year}&make=${maker}`)
        return response.data;
    }catch{
        return [];
    }
}

