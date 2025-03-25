import api, { handleError } from "./api.js";

export const getAllAppointments = async () => {
    try {
        const response = await api.get('/api/appointments');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAppointmentById = async (id) => {
    try {
        const response = await api.get(`/api/appointments/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getMyUpcomingAppointments = async () => {
    try {
        const response = await api.get('/api/appointments/my-upcoming-appointment');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getMyHistoricalAppointments = async () => {
    try {
        const response = await api.get('/api/appointments/my-historical-appointment');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};


export const createAppointment = async (data) => {
    try {
        const response = await api.post('/api/appointments/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateAppointment = async (id, data) => {
    try {
        const response = await api.put(`/api/appointments/${id}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const cancelAppointment = async (id) => {
    try {
        const response = await api.put(`/api/appointments/cancel/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete(`/api/appointments/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
