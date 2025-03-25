import api, { handleError } from "./api.js";

export const getAllBlogs = async () => {
    try {
        const response = await api.get('/api/blogs');
        return response.data.result;
    } catch (error) {
        handleError(error);
        return [];
    }
};

export const getBlogById = async (id) => {
    try {
        const response = await api.get(`/api/blogs/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        return null; // hoặc throw error tùy use case
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
        return null; // hoặc throw error tùy use case
    }
};

export const updateBlog = async (id, blogData, thumbnail) => {
    try {
        if (!id) {
            throw new Error("ID blog không được để trống");
        }

        console.log("Calling updateBlog API with ID:", id);
        console.log("Blog data:", blogData);
        
        const formData = new FormData();
        formData.append("blog", new Blob([JSON.stringify({
            title: blogData.title,
            content: blogData.content
        })], { type: "application/json" }));
        
        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        const response = await api.put(`/api/blogs/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (error) {
        console.error("Error in updateBlog API:", error);
        throw error;
    }
}; 

export const deleteBlog = async (id) => {
    try {
        const response = await api.delete(`/api/blogs/delete/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
        return false; // hoặc throw error tùy use case
    }
};
