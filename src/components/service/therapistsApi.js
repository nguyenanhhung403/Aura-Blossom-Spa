import api, { handleError } from "./api.js";

export const getAllTherapists = async () => {
    try {
        const response = await api.get('/api/therapists');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getTherapistById = async (id) => {
    try {
        const response = await api.get(`/api/therapists/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createTherapist = async (therapistRequest, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("therapist", JSON.stringify(therapistRequest));
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        const response = await api.post('/api/therapists/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateTherapist = async (id, therapistRequest, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("therapist", JSON.stringify(therapistRequest));
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        const response = await api.put(`/api/therapists/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteTherapist = async (id) => {
    try {
        const response = await api.delete(`/api/therapists/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};