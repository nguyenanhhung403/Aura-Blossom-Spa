import api, { handleError } from "./api.js";

export const getAllQuizzes = async () => {
    try {
        const response = await api.get('/api/quizzes');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getQuizById = async (quizId) => {
    try {
        const response = await api.get(`/api/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createQuiz = async (request) => {
    try {
        const response = await api.post('/api/quizzes/create', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateQuiz = async (quizId, quizUpdateRequest) => {
    try {
        const response = await api.put(`/api/quizzes/update/${quizId}`, quizUpdateRequest);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteQuiz = async (quizId) => {
    try {
        const response = await api.delete(`/api/quizzes/delete/${quizId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addQuestionsToQuiz = async (quizId, request) => {
    try {
        const response = await api.post(`/api/quizzes/add-questions-to/${quizId}`, request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const removeQuestionsFromQuiz = async (quizId, request) => {
    try {
        // Sử dụng `data` trong config để gửi body với phương thức DELETE
        const response = await api.delete(`/api/quizzes/remove-questions-from/${quizId}`, { data: request });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};