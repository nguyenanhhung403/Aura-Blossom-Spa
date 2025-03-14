import api, {handleError} from "./api.js";

export const getAllTherapists = async () => {
    try {
        const response = await api.get('/therapists');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getTherapistById = async (therapistId) => {
    try {
        const response = await api.get(`/therapists/${therapistId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const createTherapist = async (data) => {
    try {
        const response = await api.post('/therapists/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const updateTherapist = async (therapistId, data) => {
    try {
        const response = await api.put(`/therapists/update/${therapistId}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

export const deleteTherapist = async (therapistId) => {
    try {
        const response = await api.delete(`/therapists/delete/${therapistId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}