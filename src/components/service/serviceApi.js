import api, { handleError } from "./api.js";

export const getAllServices = async () => {
  try {
    const response = await api.get("/api/services");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFavoriteServices = async () => {
  try {
    const response = await api.get("/api/services/signature");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createService = async (serviceRequest, thumbnail) => {
  try {
    const formData = new FormData();
    console.log("serviceRequest:", JSON.stringify(serviceRequest));
    formData.append(
      "service",
      new Blob([JSON.stringify(serviceRequest)], {
        type: "application/json",
      })
    );
    if (thumbnail && thumbnail instanceof File) {
      formData.append("thumbnail", thumbnail);
    } else {
      console.warn("Thumbnail is not a valid File object:", thumbnail);
    }

    const response = await api.post("/api/services/create", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in createService:", error);
    handleError(error);
    throw error;
  }
};

export const updateService = async (id, serviceData, thumbnailFile) => {
  try {
    const formData = new FormData();
    
    // Tạo object data để gửi lên server
    const dataToSend = {
      name: serviceData.name,
      description: serviceData.description,
      price: Number(serviceData.price),
      duration: Number(serviceData.duration),
      categoryId: serviceData.categoryId
    };

    // Log để debug
    console.log("serviceData being sent:", dataToSend);

    formData.append(
      "service",
      new Blob([JSON.stringify(dataToSend)], {
        type: "application/json",
      })
    );

    // Kiểm tra và thêm thumbnail nếu có
    if (thumbnailFile && thumbnailFile instanceof File) {
      formData.append("thumbnail", thumbnailFile);
    }

    const response = await api.put(`/api/services/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error in updateService:", error);
    if (error.response?.status === 404) {
      throw new Error("Không tìm thấy dịch vụ này!");
    }
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/api/services/delete/${id}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Không tìm thấy dịch vụ này!");
    }
    throw error;
  }
};

export const getSignatureServices = async () => {
  try {
    const response = await api.get("/api/services/signature");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
