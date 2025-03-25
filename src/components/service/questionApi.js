import api, { handleError } from "./api.js";

export const getAllQuestions = async () => {
    try {
        const response = await api.get('/api/questions');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getQuestionById = async (questionId) => {
    try {
        const response = await api.get(`/api/questions/${questionId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createQuestion = async (request) => {
    try {
        const response = await api.post('/api/questions/create', request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
export const createQuestionWithAnswers = async (request, id) => {
    try {
        const response = await api.post('/api/questions/createWithAnswers/'+id, request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateQuestion = async (questionId, questionUpdateRequest) => {
    try {
        const response = await api.put(`/api/questions/update/${questionId}`, questionUpdateRequest);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteQuestion = async (questionId) => {
    try {
        const response = await api.delete(`/api/questions/delete/${questionId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const addAnswersToQuestion = async (questionId, request) => {
    try {
        const response = await api.post(`/api/questions/add-answers-to/${questionId}`, request);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const removeAnswersFromQuestion = async (questionId, request) => {
    try {
        const response = await api.delete(`/api/questions/remove-answers-from/${questionId}`, { data: request });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};