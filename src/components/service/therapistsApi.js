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

export const createTherapist = async (therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        // Thêm dữ liệu therapist vào FormData
        formData.append("therapist", new Blob([JSON.stringify(therapistData)], {
            type: "application/json"
        }));

        // Thêm file hình ảnh nếu có
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.post('/api/therapists/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateTherapist = async (id, therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        formData.append("therapist", new Blob([JSON.stringify(therapistData)], {
            type: "application/json"
        }));

        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.put(`/api/therapists/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
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

const loadTherapists = async () => {
    try {
        const response = await getAllTherapists();
        if (response.code === 1000) {
            setTherapists(response.result);
        }
    } catch (error) {
        // Nếu là lỗi không tìm thấy therapist
        if (error.response?.data?.code === 1014) { // Giả sử 1014 là THERAPIST_NOT_FOUND
            setTherapists([]); // Set empty array
            // Có thể hiển thị thông báo "Chưa có chuyên viên nào"
        } else {
            // Xử lý các lỗi khác
            console.error("Lỗi khi tải danh sách chuyên viên:", error);
        }
    }
};