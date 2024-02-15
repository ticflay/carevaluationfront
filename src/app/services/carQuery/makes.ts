import api from "./config/api"
import { getModels } from "./models";
import { getYears } from "./year";

export const getMakes = async (year: number) => {
   try {
    const makes = await api.get(`?cmd=getMakes&year=${year}`);
    return makes.data;
   }catch {
    return []
   }
}

export const getAllModelsByYear = async (yaer: number) => {
    const makes = await getMakes(yaer);
    const models: any[] = [];
    await Promise.all(makes.Makes.map(async (item: any) => {
        const response =  await getModels(yaer, item.make_id);
        models.push(...response.Models.map((model: any) => ({...model, ...item})))
    }));
    return models;
}