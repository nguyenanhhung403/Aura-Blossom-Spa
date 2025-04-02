import api, { handleError } from "./api.js";

export const getAllTherapists = async () => {
    try {
        const response = await api.get('/api/therapists');
        return response.data;
    } catch (error) {
        handleError(error);
        throw error; // Ném lỗi để caller có thể xử lý
    }
};

export const getTherapistById = async (id) => {
    try {
        const response = await api.get(`/api/therapists/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
// do not enter anything
export const createTherapist = async (therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        // Use a Blob with the correct content type
        formData.append("therapist", new Blob([JSON.stringify(therapistData)], {
            type: 'application/json'
        }));

        // Add file if available
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.post('/api/therapists/create', formData);
        
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const updateTherapist = async (id, therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        // Use a Blob with the correct content type
        const therapistBlob = new Blob([JSON.stringify(therapistData)], {
            type: 'application/json'
        });
        formData.append("therapist", therapistBlob);

        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.put(`/api/therapists/update/${id}`, formData);
        
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const deleteTherapist = async (id) => {
    try {
        const response = await api.delete(`/api/therapists/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Hàm tiện ích để sử dụng trong component
export const loadTherapistsList = async (setTherapists, setError) => {
    try {
        const response = await getAllTherapists();
        if (response && response.code === 1000) {
            setTherapists(response.result || []);
            return true;
        } else {
            throw new Error(response?.message || "Không thể tải danh sách chuyên viên");
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách chuyên viên:", error);
        if (setError) {
            setError("Không thể tải danh sách chuyên viên. Vui lòng thử lại sau.");
        }
        return false;
    }
};