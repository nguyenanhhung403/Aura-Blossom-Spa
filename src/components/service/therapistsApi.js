import api, { handleError } from "./api.js";

export const getAllTherapists = async () => {
    try {
        const response = await api.get('/api/therapists');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createTherapist = async (therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        // Chuyển đổi experience thành số trước khi stringify
        const dataToSend = {
            ...therapistData,
            experience: Number(therapistData.experience)
        };
        
        // Thêm dữ liệu therapist vào FormData
        formData.append("therapist", new Blob([JSON.stringify(dataToSend)], {
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
        const dataToSend = {
            fullname: therapistData.fullname,
            phone: therapistData.phone,
            email: therapistData.email,
            experience: Number(therapistData.experience),
            description: therapistData.description || ""
        };

        formData.append("therapist", new Blob([JSON.stringify(dataToSend)], {
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
        if (error.response?.status === 409) {
            throw new Error("Email hoặc số điện thoại đã tồn tại trong hệ thống!");
        }
        throw error;
    }
};

export const deleteTherapist = async (id) => {
    try {
        // Sửa endpoint từ /api/therapists/delete/{id} thành /api/therapists/{id}
        const response = await api.delete(`/api/therapists/delete/${id}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 400) {
            throw new Error("Không thể xóa chuyên viên này vì có dữ liệu liên quan!");
        } else if (error.response?.status === 404) {
            throw new Error("Không tìm thấy chuyên viên này!");
        }
        throw error;
    }
};