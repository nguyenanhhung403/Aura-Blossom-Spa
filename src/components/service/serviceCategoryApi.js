import api, { handleError } from "./api.js";

export const getAllServiceCategories = async () => {
    try {
        const response = await api.get('/api/categories');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getServiceCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createServiceCategory = async (data) => {
    try {
        const response = await api.post('/api/categories/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateServiceCategory = async (id, data) => {
    try {
        const response = await api.put(`/api/categories/update/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteServiceCategory = async (id) => {
    try {
        const response = await api.delete(`/api/categories/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};