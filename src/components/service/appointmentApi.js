import api, {handleError} from "./api.js";

export const getAllAppointments = async () => {
    try {
        const response = await api.get('/therapists');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getAppointmentById = async (appointmentId) => {
    try {
        const response = await api.get(`/therapists/${appointmentId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createAppointment = async (data) => {
    try {
        const response = await api.post('/therapists/create', data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateAppointment = async (appointmentId, data) => {
    try {
        const response = await api.put(`/therapists/update/${appointmentId}`, data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteAppointment = async (appointmentId) => {
    try {
        const response = await api.delete(`/therapists/delete/${appointmentId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}