import { Car, CarList } from "./Model/Car";

const urlRoot: string = 'https://localhost:7240/api';


export async function getAll(searchFilter: string, page : number): Promise<CarList> {
    const response = await fetch(`${urlRoot}/car?query=${searchFilter}&page=${page}`);
    return await response.json();
}

export async function create(formData: FormData): Promise<Car> {
    const response = await fetch(`${urlRoot}/car`, {
        method: 'POST',
        body: formData
    });
    return await response.json();
}

export async function update(id: number, formData: FormData): Promise<void> {
    await fetch(`${urlRoot}/car/${id}`, {
        method: 'PUT',
        body: formData
    });
}

export async function deleteCar(id: number): Promise<void> {
    await fetch(`${urlRoot}/car/${id}`, {
        method: 'DELETE'
    });
}
