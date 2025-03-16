import api, { handleError } from "./api.js";

export const getAllServiceRecommendations = async () => {
    try {
        const response = await api.get('/api/recommendations');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getServiceRecommendationById = async (serviceRecommendationId) => {
    try {
        const response = await api.get(`/api/recommendations/${serviceRecommendationId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createServiceRecommendation = async (request) => {
    try {
        const response = await api.post('/api/recommendations/create', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateServiceRecommendation = async (serviceRecommendationId, request) => {
    try {
        const response = await api.put(`/api/recommendations/update/${serviceRecommendationId}`, request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteServiceRecommendation = async (serviceRecommendationId) => {
    try {
        const response = await api.delete(`/api/recommendations/delete/${serviceRecommendationId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const calculateRecommendation = async (request) => {
    try {
        const response = await api.post('/api/recommendations/calculate-recommendation', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};