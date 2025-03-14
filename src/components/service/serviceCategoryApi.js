import api, {handleError} from "./api.js";

export const getAllServiceCategory = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getServiceCategoryById = async (categoryId) => {
    try {
        const response = await api.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }

}

export const createServiceCategory = async (data) => {
    try {
        const response = await api.post('/categories/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateServiceCategory = async (categoryId, data) => {
    try {
        const response = await api.put(`/categories/update/${categoryId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteServiceCategory = async (categoryId) => {
    try {
        const response = await api.delete(`/categories/delete/${categoryId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}