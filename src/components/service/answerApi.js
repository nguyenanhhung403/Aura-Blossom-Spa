import api, { handleError } from "./api.js";

export const getAllAnswers = async () => {
    try {
        const response = await api.get('/api/answers');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAnswerById = async (answerId) => {
    try {
        const response = await api.get(`/api/answers/${answerId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createAnswer = async (data) => {
    try {
        const response = await api.post('/api/answers/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateAnswer = async (answerId, data) => {
    try {
        const response = await api.put(`/api/answers/update/${answerId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteAnswer = async (answerId) => {
    try {
        const response = await api.delete(`/api/answers/delete/${answerId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};