import api, {handleError} from "./api.js";

export const getAllSlot = async () => {
    try {
        const response = await api.get('/slots');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAvailableSlot = async (date) => {
    try {
        const response = await api.get(`/slots/available/date/${date}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getSlotById = async (slotId) => {
    try {
        const response = await api.get(`/slots/${slotId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createSlot = async (data) => {
    try {
        const response = await api.post('/slots/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateSlot = async (slotId, data) => {
    try {
        const response = await api.put(`/slots/update/${slotId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteSlot = async (slotId) => {
    try {
        const response = await api.delete(`/slots/delete/${slotId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}