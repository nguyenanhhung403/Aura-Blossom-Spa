import React, { useState, useEffect } from "react";
import { FaSearch, FaThList, FaThLarge, FaSort, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "./SideBar";
import { getAllBlogs, createBlog, deleteBlog, getBlogById, updateBlog } from "../../service/blogApi.js";
import axios from "axios";


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: null
  });

  // Lấy dữ liệu blog từ API
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      console.log("Dữ liệu blogs nhận được:", data);
      
      if (!Array.isArray(data)) {
        console.error("Dữ liệu không hợp lệ:", data);
        setBlogs([]);
      } else {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blogs:", error);
      setBlogs([]);
    }
  };
  
  // Xử lý chọn file ảnh cho thumbnail
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnail: file });
  };

  // Xóa blog
  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa blog:", error);
    }
  };

  // Handle update blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!currentBlog || !currentBlog.id) {
        console.error("Không có blog ID để cập nhật");
        return;
      }

      // Log để debug
      console.log("Đang cập nhật blog với ID:", currentBlog.id);
      console.log("Dữ liệu cập nhật:", formData);

      // Gọi API update với ID của blog hiện tại
      await updateBlog(
        currentBlog.id,  // ID của blog cần update
        {
          title: formData.title,
          content: formData.content
        },
        formData.thumbnail
      );
      
      // Reset states
      setIsEditing(false);
      setCurrentBlog(null);
      setFormData({
        title: '',
        content: '',
        thumbnail: null
      });
      
      // Refresh blog list
      fetchBlogs();
      alert('Cập nhật bài viết thành công!');
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      alert('Có lỗi xảy ra khi cập nhật bài viết!');
    }
  };

  // Handle edit (khi click vào nút Edit)
  const handleEdit = (blog) => {
    console.log("Blog được chọn để edit:", blog);
    setCurrentBlog({...blog}); // Clone blog object
    setIsEditing(true);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      thumbnail: null
    });
  };

  // Hàm reset form
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      thumbnail: null
    });
    setIsEditing(false);
    setCurrentBlog(null);
  };

  // Sửa lại phần form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentBlog) {
        console.log("Đang cập nhật blog với ID:", currentBlog.id);
        
        // Gọi API update với data đơn giản
        const response = await updateBlog(
          currentBlog.id,
          {
            title: formData.title,
            content: formData.content
          },
          formData.thumbnail
        );
        
        console.log("Kết quả update:", response);
        
        if (response.code === 1000) {
          alert('Cập nhật bài viết thành công!');
          await fetchBlogs(); // Fetch lại data mới
          
          // Reset form và state
          setFormData({
            title: '',
            content: '',
            thumbnail: null
          });
          setIsEditing(false);
          setCurrentBlog(null);
        }
      } else {
        // Xử lý tạo mới
        const response = await createBlog(formData, formData.thumbnail);
        if (response.code === 1000) {
          alert('Tạo bài viết thành công!');
          await fetchBlogs();
          setFormData({
            title: '',
            content: '',
            thumbnail: null
          });
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert('Có lỗi xảy ra: ' + error.message);
    }
  };

  // Bộ lọc và sắp xếp blog
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Trong phần render, thêm log để kiểm tra currentBlog
  console.log("Current blog state:", currentBlog);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold mb-4 md:mb-0 text-gray-100">Blogs</h1>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm blog..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* View mode toggle */}
            <div className="flex border rounded-lg overflow-hidden border-gray-600">
              <button
                className={`px-3 py-2 ${
                  viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setViewMode("list")}
              >
                <FaThList />
              </button>
              <button
                className={`px-3 py-2 ${
                  viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <FaThLarge />
              </button>
            </div>

            {/* Sort dropdown */}
            <div className="relative inline-block">
              <select
                className="border rounded-lg px-3 py-2 appearance-none pr-8 bg-gray-700 border-gray-600 text-gray-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Ngày đăng</option>
                <option value="title">Tiêu đề</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <FaSort className="text-gray-400" />
              </div>
            </div>

            {/* Sort order button */}
            <button
              className="border rounded-lg px-3 py-2 bg-gray-700 border-gray-600 text-gray-200"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
            </button>

            {/* Button mở form tạo mới */}
            <button
              className="flex items-center border rounded-lg px-3 py-2 bg-green-600 text-white"
              onClick={() => {
                resetForm();
              }}
            >
              <FaPlus className="mr-1" /> Thêm mới
            </button>
          </div>
        </div>

        {/* Form tạo / cập nhật blog */}
        <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-4 rounded-lg" encType="multipart/form-data">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Cập nhật Blog" : "Tạo Blog mới"}
          </h2>
          <div className="mb-4">
            <label className="block mb-1">Tiêu đề</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
              value={formData.title || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                title: e.target.value
              }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Nội dung</label>
            <textarea
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
              value={formData.content || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                content: e.target.value
              }))}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Chọn ảnh thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                thumbnail: e.target.files[0] || null
              }))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
              // Nếu tạo mới thì bắt buộc chọn file, còn cập nhật có thể giữ lại ảnh cũ
              required={!isEditing || (isEditing && formData.thumbnail)}
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            {isEditing ? "Cập nhật" : "Tạo"}
          </button>
        </form>

        {/* Hiển thị danh sách blog */}
        {viewMode === "list" ? (
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Nội dung
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {sortedBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {blog.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-200">
                      {blog.title}
                    </td>
                    <td className="px-6 py-4 truncate max-w-xs text-gray-300">
                      {blog.content}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="h-10 w-10 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button className="mr-2 text-blue-400" onClick={() => handleEdit(blog)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-400" onClick={() => handleDelete(blog.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                {sortedBlogs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                      Không tìm thấy blog phù hợp!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogs.map((blog) => (
              <div key={blog.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-200">
                      {blog.category || "Uncategorized"}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-100">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex items-center">
                    <img src={blog.thumbnail} alt={blog.title} className="h-8 w-8 rounded-full mr-2" />
                    <span className="text-sm text-gray-300">{blog.author || "AuraBlossomSpa"}</span>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button className="mr-2 text-blue-400" onClick={() => handleEdit(blog)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-400" onClick={() => handleDelete(blog.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {sortedBlogs.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-400">
                Không tìm thấy blog phù hợp!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
