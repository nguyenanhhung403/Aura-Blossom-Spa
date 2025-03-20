import api, { handleError } from "./api.js";

// Get all categories
export const getAllServiceCategories = async () => {
    try {
        const response = await api.get('/api/categories');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get category by ID 
export const getServiceCategoryById = async (id) => {
    try {
        const response = await api.get(`/api/categories/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Create new category
export const createServiceCategory = async (categoryData) => {
    try {
        const response = await api.post('/api/categories/create', {
            name: categoryData.name,
            description: categoryData.description,
            signature: categoryData.signature
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update category
export const updateServiceCategory = async (id, categoryData) => {
    try {
        const response = await api.put(`/api/categories/update/${id}`, {
            name: categoryData.name,
            description: categoryData.description, 
            signature: categoryData.signature
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete category
export const deleteServiceCategory = async (id) => {
    try {
        const response = await api.delete(`/api/categories/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};