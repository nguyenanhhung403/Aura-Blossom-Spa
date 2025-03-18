import api, { handleError } from "./api.js";

export const createRating = async (appointmentId, data) => {
    try {
        const response = await api.post(`/api/ratings/create/appointment/${appointmentId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getRatingByAppointment = async (appointmentId) => {
    try {
        const response = await api.get(`/api/ratings/appointment/${appointmentId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getRatingByService = async (serviceId) => {
    try {
        const response = await api.get(`/api/ratings/service/${serviceId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAllRatings = async () => {
    try {
        const response = await api.get('/api/ratings/all');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteRating = async (ratingId) => {
    try {
        const response = await api.delete(`/api/ratings/delete/${ratingId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
