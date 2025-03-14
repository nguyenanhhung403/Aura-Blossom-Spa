import api, { handleError } from "./api.js";

export const getAllSlots = async () => {
    try {
        const response = await api.get('/api/slots');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getSlotById = async (id) => {
    try {
        const response = await api.get(`/api/slots/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAvailableSlotsByDate = async (date) => {
    try {
        const response = await api.get(`/api/slots/available/date/${date}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAvailableSlotsByTherapist = async (therapistId) => {
    try {
        const response = await api.get(`/api/slots/available/therapist/${therapistId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const generateSlotsForDay = async (slotRequest) => {
    try {
        const response = await api.post('/api/slots/generate/day', slotRequest);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteSlot = async (id) => {
    try {
        const response = await api.delete(`/api/slots/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};