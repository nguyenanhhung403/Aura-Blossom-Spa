import React, { useState, useEffect } from "react";
import Sidebar from "./SideBar";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios"; // Thêm thư viện axios để gọi API

const WorkSchedule = () => {
  // State để theo dõi khoảng thời gian xem lịch
  const [dateRange, setDateRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split('T')[0]
  });

  // State để lưu trữ lịch hẹn đang được chỉnh sửa
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  // State cho modal chỉnh sửa
  const [showEditModal, setShowEditModal] = useState(false);

  // State cho modal tạo lịch mới
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // State cho lịch hẹn mới
  const [newAppointment, setNewAppointment] = useState({
    selectedSpecialists: [],
    weekSelection: "current"
  });

  // State cho danh sách chuyên viên từ database
  const [specialists, setSpecialists] = useState([]);
  
  // State cho dữ liệu lịch làm việc từ database
  const [scheduleData, setScheduleData] = useState({});
  
  // State để theo dõi tuần hiện tại
  const [currentWeek, setCurrentWeek] = useState(0);

  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State to track selected day for mobile view
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch danh sách chuyên viên từ API
  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/specialists');
        setSpecialists(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  // Fetch lịch làm việc từ API
  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/schedules', {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
          }
        });
        
        // Chuyển đổi dữ liệu từ API thành định dạng phù hợp
        const formattedData = {};
        response.data.forEach(item => {
          const date = item.date.split('T')[0];
          if (!formattedData[date]) {
            formattedData[date] = [];
          }
          formattedData[date].push({
            id: item.id,
            specialist: item.specialistName,
            specialistId: item.specialistId
          });
        });
        
        setScheduleData(formattedData);
        setSelectedDate(Object.keys(formattedData)[0] || "");
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchScheduleData();
  }, [dateRange, currentWeek]);

  // Function to count total appointments for a day
  const countAppointments = (date) => {
    return scheduleData[date]?.length || 0;
  };

  // Function to determine if a day has any appointments
  const hasAppointments = (date) => {
    return countAppointments(date) > 0;
  };

  // Xóa lịch hẹn
  const deleteAppointment = async (date, id) => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      setScheduleData(prevData => {
        const newData = {...prevData};
        if (newData[date]) {
          newData[date] = newData[date].filter(app => app.id !== id);
        }
        return newData;
      });
      
      // Cập nhật lại kết quả tìm kiếm nếu đang hiển thị
      if (isSearching) {
        setSearchResults(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Cập nhật khoảng thời gian
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Tìm kiếm lịch hẹn
  const searchAppointments = async () => {
    try {
      setIsSearching(true);
      setIsLoading(true);
      
      const response = await axios.get('/api/schedules/search', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          searchTerm: searchTerm
        }
      });
      
      // Format dữ liệu kết quả tìm kiếm
      const results = response.data.map(item => ({
        ...item,
        date: item.date.split('T')[0],
        dateFormatted: formatDate(item.date)
      }));
      
      setSearchResults(results);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Xử lý thay đổi trong form tạo lịch mới
  const handleNewAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý chọn chuyên viên
  const handleSpecialistSelection = (specialistId) => {
    setNewAppointment(prev => {
      const selectedSpecialists = [...prev.selectedSpecialists];
      
      if (selectedSpecialists.includes(specialistId)) {
        // Nếu đã chọn thì bỏ chọn
        return {
          ...prev,
          selectedSpecialists: selectedSpecialists.filter(id => id !== specialistId)
        };
      } else {
        // Nếu chưa chọn thì thêm vào
        return {
          ...prev,
          selectedSpecialists: [...selectedSpecialists, specialistId]
        };
      }
    });
  };

  // Chọn tất cả chuyên viên
  const selectAllSpecialists = () => {
    setNewAppointment(prev => ({
      ...prev,
      selectedSpecialists: specialists.map(s => s.id)
    }));
  };

  // Bỏ chọn tất cả chuyên viên
  const deselectAllSpecialists = () => {
    setNewAppointment(prev => ({
      ...prev,
      selectedSpecialists: []
    }));
  };

  // Format ngày hiển thị
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const weekday = getWeekdayFromDate(dateString);
    return `${day}/${month} (${weekday})`;
  };

  // Chuyển đổi ngày thành thứ
  const getWeekdayFromDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    const weekdays = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    return weekdays[dayOfWeek];
  };

  // Lưu lịch hẹn mới
  const saveNewAppointment = async () => {
    try {
      // Kiểm tra dữ liệu
      if (newAppointment.selectedSpecialists.length === 0) {
        alert("Vui lòng chọn ít nhất một chuyên viên!");
        return;
      }

      // Tạo các lịch hẹn mới
      const appointmentsToCreate = newAppointment.selectedSpecialists.map(specialistId => ({
        specialistId,
        date: newAppointment.date
      }));

      // Gửi request tạo lịch hẹn
      await axios.post('/api/schedules/bulk', { appointments: appointmentsToCreate });
      
      // Fetch lại dữ liệu sau khi tạo thành công
      const response = await axios.get('/api/schedules', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate
        }
      });
      
      // Cập nhật state với dữ liệu mới
      const formattedData = {};
      response.data.forEach(item => {
        const date = item.date.split('T')[0];
        if (!formattedData[date]) {
          formattedData[date] = [];
        }
        formattedData[date].push({
          id: item.id,
          specialist: item.specialistName,
          specialistId: item.specialistId
        });
      });
      
      setScheduleData(formattedData);

      // Reset form và đóng modal
      setNewAppointment({
        selectedSpecialists: [],
        weekSelection: "current"
      });
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Xử lý cập nhật lịch hẹn
  const handleUpdateAppointment = async () => {
    try {
      await axios.put(`/api/schedules/${editingAppointment.id}`, {
        specialistId: editingAppointment.specialistId,
        date: editingAppointment.date
      });
      
      // Cập nhật state với dữ liệu mới
      setScheduleData(prevData => {
        const newData = {...prevData};
        const date = Object.keys(newData).find(date => 
          newData[date].some(app => app.id === editingAppointment.id)
        );
        
        if (date) {
          newData[date] = newData[date].map(app => 
            app.id === editingAppointment.id ? editingAppointment : app
          );
        }
        return newData;
      });
      
      setShowEditModal(false);
      setEditingAppointment(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Render appointment card
  const renderAppointment = (entry, date) => {
    const specialist = specialists.find(s => s.id === entry.specialistId);
    const specialistName = specialist ? specialist.name : `Chuyên viên (ID: ${entry.specialistId})`;
    
    return (
      <div className="bg-gray-700 rounded-lg p-2 mb-2 border-l-4 border-blue-400 hover:border-blue-300 transition-all">
        <div className="mt-1 text-gray-200">
          <div className="flex items-center">
            <span className="w-20 text-gray-400">Chuyên viên:</span>
            <span>{specialistName}</span>
          </div>
        </div>
        <div className="mt-2 flex justify-end space-x-2">
          <button 
            onClick={() => deleteAppointment(date, entry.id)}
            className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            <FaTrash />
          </button>
          <button 
            onClick={() => {
              setEditingAppointment(entry);
              setShowEditModal(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs"
          >
            <FaEdit />
          </button>
        </div>
      </div>
    );
  };

  // ... (Các hàm render khác giữ nguyên, chỉ cần thay đổi từ 'doctor' sang 'specialist')

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Page header */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl text-white">Lịch làm việc chuyên viên</h1>
          </div>
          
          {/* Search and Create buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center"
            >
              <FaPlus className="mr-1" /> Tạo lịch mới
            </button>
          </div>
        </div>

        {/* Hiển thị lỗi nếu có */}
        {error && (
          <div className="bg-red-800 text-white p-3 rounded mb-4">
            Lỗi: {error}
          </div>
        )}

        {/* Hiển thị loading */}
        {isLoading && (
          <div className="text-center py-4">
            Đang tải dữ liệu...
          </div>
        )}

        {/* Phần hiển thị chính */}
        {!isLoading && (
          <>
            {/* Mobile day selector */}
            <div className="lg:hidden mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Chọn ngày:</label>
              <select 
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {Object.keys(scheduleData).map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)} {hasAppointments(date) ? `(${countAppointments(date)})` : "(Trống)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop view - Table layout */}
            <div className="hidden lg:block mb-6 overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    {Object.keys(scheduleData).map((date, index) => (
                      <th 
                        key={date} 
                        className={`bg-gray-800 p-3 font-medium ${
                          index < Object.keys(scheduleData).length - 1 ? 'border-r border-gray-600' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">{formatDate(date)}</span>
                          {hasAppointments(date) && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                              {countAppointments(date)}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.keys(scheduleData).map((date, index) => (
                      <td 
                        key={date} 
                        className={`bg-gray-800 p-3 align-top ${
                          index < Object.keys(scheduleData).length - 1 ? 'border-r border-gray-600' : ''
                        }`}
                      >
                        {hasAppointments(date) ? (
                          scheduleData[date].map((entry, i) => (
                            <div key={i} className="mb-2">
                              {renderAppointment(entry, date)}
                            </div>
                          ))
                        ) : (
                          <div className="text-gray-500 text-sm italic bg-gray-750 p-2 rounded text-center">Không có lịch</div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile view - Single day schedule */}
            <div className="lg:hidden">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-3">
                  {selectedDate ? formatDate(selectedDate) : "Chọn ngày"}
                </h2>
                
                <div>
                  {selectedDate && scheduleData[selectedDate]?.length > 0 ? (
                    scheduleData[selectedDate].map((entry, i) => (
                      <div key={i} className="mb-3">{renderAppointment(entry, selectedDate)}</div>
                    ))
                  ) : (
                    <div className="text-center py-3 text-gray-500 bg-gray-750 rounded">
                      Không có lịch làm việc
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal tạo lịch mới */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-white">Tạo lịch làm việc mới</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Chọn ngày:</label>
                <input 
                  type="date" 
                  name="date"
                  value={newAppointment.date || ""}
                  onChange={handleNewAppointmentChange}
                  className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Chọn chuyên viên:</label>
                <div className="flex justify-between mb-2">
                  <button
                    onClick={selectAllSpecialists}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    onClick={deselectAllSpecialists}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>
                <div className="bg-gray-700 border border-gray-600 rounded-md p-3 max-h-60 overflow-y-auto">
                  {specialists.map(specialist => (
                    <div key={specialist.id} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`specialist-${specialist.id}`}
                        checked={newAppointment.selectedSpecialists.includes(specialist.id)}
                        onChange={() => handleSpecialistSelection(specialist.id)}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor={`specialist-${specialist.id}`} className="cursor-pointer">
                        {specialist.name}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Đã chọn: {newAppointment.selectedSpecialists.length} chuyên viên
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button 
                  onClick={saveNewAppointment}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded"
                >
                  Tạo lịch
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal chỉnh sửa */}
        {showEditModal && editingAppointment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4 text-white">Chỉnh sửa lịch làm việc</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-2">Chọn chuyên viên:</label>
                <select
                  value={editingAppointment.specialistId}
                  onChange={(e) => setEditingAppointment({
                    ...editingAppointment, 
                    specialistId: e.target.value,
                    specialist: specialists.find(s => s.id === e.target.value)?.name || ""
                  })}
                  className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                >
                  {specialists.map(specialist => (
                    <option key={specialist.id} value={specialist.id}>
                      {specialist.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingAppointment(null);
                  }}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleUpdateAppointment}
                  className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkSchedule;