import api, { handleError } from "./api.js";

export const getAllServices = async () => {
    try {
        const response = await api.get('/api/services');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getServiceById = async (id) => {
    try {
        const response = await api.get(`/api/services/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createService = async (serviceRequest, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("service", JSON.stringify(serviceRequest));
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        const response = await api.post('/api/services/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateService = async (id, serviceRequest, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("service", JSON.stringify(serviceRequest));
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        const response = await api.put(`/api/services/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/api/services/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};