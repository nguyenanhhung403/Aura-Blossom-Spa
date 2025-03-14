import api, {handleError} from "./api.js";

export const getAllServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getServiceById = async (serviceId) => {
    try {
        const response = await api.get(`/services/${serviceId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createService = async (data) => {
    try {
        const response = await api.post('/services/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateService = async (serviceId, data) => {
    try {
        const response = await api.put(`/services/update/${serviceId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteService = async (serviceId) => {
    try {
        const response = await api.delete(`/services/delete/${serviceId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}