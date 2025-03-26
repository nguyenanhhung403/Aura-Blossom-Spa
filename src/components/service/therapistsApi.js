import api, { handleError } from "./api.js";

export const getAllTherapists = async () => {
    try {
        const response = await api.get('/api/users');
        console.log('Raw API response in getAllTherapists:', JSON.stringify(response.data, null, 2));
        
        if (response.data?.result) {
            // Log một user mẫu để xem cấu trúc
            console.log('Sample user structure:', JSON.stringify(response.data.result[0], null, 2));
            
            // Lọc ra các user có role THERAPIST
            const therapists = response.data.result.filter(user => {
                // Log toàn bộ thông tin user để debug
                console.log('Processing user:', JSON.stringify(user, null, 2));
                
                // Kiểm tra role từ cả hai trường có thể chứa role
                const roleArray = user.role || [];
                console.log(`User ${user.username} role array:`, JSON.stringify(roleArray, null, 2));
                
                // Kiểm tra nếu có role THERAPIST
                const isTherapist = roleArray.some(r => {
                    if (typeof r === 'object' && r !== null) {
                        return r.name === 'THERAPIST';
                    }
                    return false;
                });
                
                console.log(`User ${user.username} isTherapist:`, isTherapist);
                return isTherapist;
            }).map(user => ({
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                phone: user.phone,
                email: user.email,
                image: user.image,
                experience: user.experience || 0,
                description: user.description || ""
            }));
            
            console.log('Filtered therapists:', therapists);
            return { result: therapists };
        }
        return { result: [] };
    } catch (error) {
        console.error("Error in getAllTherapists:", error);
        handleError(error);
    }
};

export const createTherapist = async (therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        // Chuẩn bị dữ liệu với role THERAPIST
        const dataToSend = {
            ...therapistData,
            experience: Number(therapistData.experience),
            role: [{ name: 'THERAPIST' }]
        };
        
        console.log('Creating therapist with data:', dataToSend);
        
        // Thêm dữ liệu user vào FormData
        formData.append("user", new Blob([JSON.stringify(dataToSend)], {
            type: "application/json"
        }));

        // Thêm file hình ảnh nếu có
        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.post('/api/users/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log('Create therapist response:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating therapist:", error);
        if (error.response?.status === 409) {
            throw new Error("Username hoặc email đã tồn tại trong hệ thống!");
        }
        handleError(error);
    }
};

export const updateTherapist = async (id, therapistData, thumbnailFile) => {
    try {
        const formData = new FormData();
        
        // Đảm bảo gửi đúng format dữ liệu và giữ nguyên role THERAPIST
        const dataToSend = {
            id: id,
            fullname: therapistData.fullname,
            phone: therapistData.phone,
            email: therapistData.email,
            experience: Number(therapistData.experience),
            description: therapistData.description || "",
            role: [{ name: 'THERAPIST' }]
        };

        console.log("Updating therapist with data:", dataToSend);

        formData.append("user", new Blob([JSON.stringify(dataToSend)], {
            type: "application/json"
        }));

        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        const response = await api.put(`/api/users/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log("Update therapist response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data);
        if (error.response?.status === 409) {
            throw new Error("Email hoặc số điện thoại đã tồn tại trong hệ thống!");
        }
        throw error;
    }
};

export const deleteTherapist = async (id) => {
    try {
        console.log("Deleting therapist with ID:", id);
        const response = await api.delete(`/api/users/delete/${id}`);
        console.log("Delete therapist response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting therapist:", error);
        if (error.response?.status === 400) {
            throw new Error("Không thể xóa chuyên viên này vì có dữ liệu liên quan!");
        } else if (error.response?.status === 404) {
            throw new Error("Không tìm thấy chuyên viên này!");
        }
        throw error;
    }
};