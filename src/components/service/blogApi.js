import api, { handleError } from "./api.js";

export const getAllBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      return response.data;
    } catch (error) {
      handleError(error);
    }
  };

 
export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/api/blogs/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createBlog = async (blogData, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("blog", new Blob([JSON.stringify(blogData)], { type: "application/json" }));
        if (thumbnail) formData.append("thumbnail", thumbnail);

        const response = await api.post("/api/blogs/create", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateBlog = async (id, blogData, thumbnail) => {
    try {
        const formData = new FormData();
        formData.append("blog", new Blob([JSON.stringify(blogData)], { type: "application/json" }));
        if (thumbnail) formData.append("thumbnail", thumbnail);

        const response = await api.put(`/api/blogs/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteBlog = async (id) => {
    try {
        await api.delete(`/api/blogs/delete/${id}`);
    } catch (error) {
        handleError(error);
    }
};
