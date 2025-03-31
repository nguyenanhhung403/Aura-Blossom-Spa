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

export const getSlotsByDateAndTherapist = async (date, therapistId) => {
    try {
        const response = await api.get(`/api/slots/date-and-therapist?date=${date}&therapistId=${therapistId}`);
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
export const generateSlotsForDateRange = async (startDate, endDate, therapistIds) => {
    try {
        const therapistIdArray = therapistIds.map(therapist => parseInt(therapist.id)).join(",");

        const response = await api.post('/api/slots/generate/date-range', null, {
            params: {
                startDate,
                endDate,
                therapistIds: therapistIdArray
            }
        });
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
export const deleteSlotByDateAndTherapist = async (therapistId, date) => {
    try {
        const response = await api.get(`/api/slots/therapist/delete?therapistId=${therapistId}&date=${date}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};