import React, { useState } from "react";
import { FaSearch, FaThList, FaThLarge, FaSort } from "react-icons/fa";
import Sidebar from "./SideBar";

const BlogList = () => {
  // Sample blog array (expanded)
  const [blogs] = useState([
    {
      id: 1,
      title: "Bí quyết chăm sóc da mùa đông",
      content: "Chia sẻ cách chăm sóc da mùa đông với các sản phẩm dưỡng ẩm chuyên sâu và phương pháp bảo vệ da khỏi thời tiết khắc nghiệt...",
      image: "https://via.placeholder.com/80",
      author: "Nguyễn Văn A",
      date: "01/03/2025",
      category: "Da mặt"
    },
    {
      id: 2,
      title: "Điều trị mụn hiệu quả tại nhà",
      content: "Điều trị mụn hiệu quả với quy trình XYZ kết hợp các sản phẩm có chứa BHA, retinol và cách chăm sóc da mụn đúng cách...",
      image: "https://via.placeholder.com/80",
      author: "Trần Thị B",
      date: "25/02/2025",
      category: "Da mụn"
    },
    {
      id: 3,
      title: "Chăm sóc tóc khô xơ mùa hanh khô",
      content: "Chăm sóc tóc khỏe, mượt với các loại mặt nạ tự nhiên, dầu dưỡng và cách gội đầu đúng để tránh làm tổn hại tóc...",
      image: "https://via.placeholder.com/80",
      author: "Lê Văn C",
      date: "20/02/2025",
      category: "Tóc"
    },
    {
      id: 4,
      title: "Các sản phẩm chống nắng tốt nhất 2025",
      content: "Tổng hợp các sản phẩm chống nắng được đánh giá cao nhất cho mọi loại da, từ da dầu, da khô đến da hỗn hợp và da nhạy cảm...",
      image: "https://via.placeholder.com/80",
      author: "Phạm Thị D",
      date: "15/02/2025",
      category: "Chống nắng"
    },
    {
      id: 5,
      title: "Quy trình skincare buổi tối hiệu quả",
      content: "Hướng dẫn chi tiết quy trình skincare buổi tối với 5 bước cơ bản giúp làn da được phục hồi và tái tạo tối ưu trong giấc ngủ...",
      image: "https://via.placeholder.com/80",
      author: "Hoàng Thị E",
      date: "10/02/2025",
      category: "Quy trình"
    },
    {
      id: 6,
      title: "Trị thâm mụn với nguyên liệu tự nhiên",
      content: "Cách điều trị vết thâm sau mụn bằng các nguyên liệu tự nhiên an toàn như nha đam, nghệ, mật ong và vitamin E...",
      image: "https://via.placeholder.com/80",
      author: "Vũ Văn F",
      date: "05/02/2025",
      category: "Da mụn"
    },
  ]);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  
  // View mode state (grid or list)
  const [viewMode, setViewMode] = useState("list");
  
  // Sort states
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  
  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });
  
  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date.split('/').reverse().join('/'));
      const dateB = new Date(b.date.split('/').reverse().join('/'));
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      return sortOrder === "asc" 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Title and toolbar */}
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
                onChange={e => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* View mode toggle */}
            <div className="flex border rounded-lg overflow-hidden border-gray-600">
              <button 
                className={`px-3 py-2 ${viewMode === "list" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}`}
                onClick={() => setViewMode("list")}
              >
                <FaThList />
              </button>
              <button 
                className={`px-3 py-2 ${viewMode === "grid" ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"}`}
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
                onChange={e => setSortBy(e.target.value)}
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
          </div>
        </div>

        {/* Blog content */}
        {viewMode === "list" ? (
          /* List view */
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tiêu đề</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Nội dung</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hình ảnh</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Tác giả</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Danh mục</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Ngày đăng</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {sortedBlogs.map(blog => (
                  <tr key={blog.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{blog.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-200">{blog.title}</td>
                    <td className="px-6 py-4 truncate max-w-xs text-gray-300">{blog.content}</td>
                    <td className="px-6 py-4">
                      <img src={blog.image} alt={blog.title} className="h-10 w-10 rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-gray-300">{blog.author}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-200">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{blog.date}</td>
                  </tr>
                ))}
                {sortedBlogs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                      Không tìm thấy blog phù hợp!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* Grid view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogs.map(blog => (
              <div key={blog.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-200">
                      {blog.category}
                    </span>
                    <span className="text-sm text-gray-400">{blog.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-100">{blog.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex items-center">
                    <img src={blog.image} alt={blog.author} className="h-8 w-8 rounded-full mr-2" />
                    <span className="text-sm text-gray-300">{blog.author}</span>
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