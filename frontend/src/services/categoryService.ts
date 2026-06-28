import { serviceCategories } from "../data";

export function getCategories() {
    return serviceCategories.filter(
        category => category.active
    );
}

export function getCategoryById(id: number) {
    return serviceCategories.find(
        category => category.id === id
    );
}