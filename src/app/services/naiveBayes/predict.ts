import api from "./config/api";


export const predict = async ({buying, doors, lug_boot, maint, persons, safety}: {buying: string, maint: string, doors: number, persons: number, lug_boot: string; safety: string}) => {
    const response = await api.post(`predict`, {0: buying, 1: maint, 2: doors > 4 ? '5more' : doors.toString(), 3: persons > 4 ? 'more' : persons.toString(), 4: lug_boot, 5: safety});
    return response.data;
}

