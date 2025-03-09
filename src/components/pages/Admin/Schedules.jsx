import React, { useState } from "react";
import Sidebar from "./SideBar";

const WorkSchedule = () => {
  // Data organized by day with morning and afternoon schedules
  const scheduleData = {
    "Thứ 2": {
      morning: [
        { time: "9h30 - 10h30", service: "Nặn mụn", doctor: "Bác sĩ A" },
        { time: "10h30 - 11h30", service: "Tư vấn da", doctor: "Bác sĩ B" },
      ],
      afternoon: [
        { time: "14h00 - 15h00", service: "Điều trị mụn", doctor: "Bác sĩ C" },
      ],
    },
    "Thứ 3": {
      morning: [
        { time: "9h00 - 10h00", service: "Chăm sóc da", doctor: "Bác sĩ D" },
      ],
      afternoon: [],
    },
    "Thứ 4": {
      morning: [],
      afternoon: [
        { time: "15h00 - 16h00", service: "Tư vấn da", doctor: "Bác sĩ E" },
      ],
    },
    "Thứ 5": {
      morning: [],
      afternoon: [],
    },
    "Thứ 6": {
      morning: [
        { time: "8h00 - 9h00", service: "Nặn mụn", doctor: "Bác sĩ F" },
      ],
      afternoon: [
        { time: "17h30 - 18h30", service: "Nặn mụn", doctor: "Bác sĩ G" },
      ],
    },
    "Thứ 7": {
      morning: [],
      afternoon: [],
    },
    "Chủ nhật": {
      morning: [],
      afternoon: [
        { time: "19h00 - 20h00", service: "Chăm sóc da", doctor: "Bác sĩ H" },
      ],
    },
  };

  // List of days in order
  const days = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ];

  // State to track selected day for mobile view
  const [selectedDay, setSelectedDay] = useState(days[0]);

  // Function to count total appointments for a day
  const countAppointments = (day) => {
    const dayData = scheduleData[day];
    return (dayData.morning.length + dayData.afternoon.length);
  };

  // Function to determine if a day has any appointments
  const hasAppointments = (day) => {
    return countAppointments(day) > 0;
  };

  // Render appointment card
  const renderAppointment = (entry) => (
    <div className="bg-gray-700 rounded-lg p-2 mb-2 border-l-4 border-blue-400 hover:border-blue-300 transition-all">
      <div className="font-semibold text-blue-300">{entry.time}</div>
      <div className="mt-1 text-gray-200">
        <div className="flex items-center mb-1">
          <span className="w-20 text-gray-400">Dịch vụ:</span>
          <span>{entry.service}</span>
        </div>
        <div className="flex items-center">
          <span className="w-20 text-gray-400">Bác sĩ:</span>
          <span>{entry.doctor}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Page header */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6 flex items-center justify-between">
          <h1 className="text-2xl text-white">Lịch làm việc</h1>
          <div className="text-sm text-gray-400">Tháng 3, 2025</div>
        </div>

        {/* Mobile day selector - only shown on small screens */}
        <div className="lg:hidden mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">Chọn ngày:</label>
          <select 
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day} {hasAppointments(day) ? `(${countAppointments(day)})` : "(Trống)"}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop view - Table layout with divider */}
        <div className="hidden lg:block mb-6 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                {days.map((day, index) => (
                  <th 
                    key={day} 
                    className={`bg-gray-800 p-3 font-medium ${
                      index < days.length - 1 ? 'border-r border-gray-600' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{day}</span>
                      {hasAppointments(day) && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2">
                          {countAppointments(day)}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {days.map((day, index) => {
                  const daySchedule = scheduleData[day];
                  const hasMorning = daySchedule.morning.length > 0;
                  
                  return (
                    <td 
                      key={`${day}-morning`} 
                      className={`bg-gray-800 p-3 align-top border-b border-gray-700 ${
                        index < days.length - 1 ? 'border-r border-gray-600' : ''
                      }`}
                    >
                      <div className="font-semibold text-sm mb-2 flex items-center bg-gray-700 p-2 rounded">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                        Sáng
                      </div>
                      {hasMorning ? (
                        daySchedule.morning.map((entry, i) => (
                          <div key={i} className="mb-2">
                            {renderAppointment(entry)}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm italic bg-gray-750 p-2 rounded text-center">Không có lịch</div>
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                {days.map((day, index) => {
                  const daySchedule = scheduleData[day];
                  const hasAfternoon = daySchedule.afternoon.length > 0;
                  
                  return (
                    <td 
                      key={`${day}-afternoon`} 
                      className={`bg-gray-800 p-3 align-top ${
                        index < days.length - 1 ? 'border-r border-gray-600' : ''
                      }`}
                    >
                      <div className="font-semibold text-sm mb-2 flex items-center bg-gray-700 p-2 rounded">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                        Chiều
                      </div>
                      {hasAfternoon ? (
                        daySchedule.afternoon.map((entry, i) => (
                          <div key={i} className="mb-2">
                            {renderAppointment(entry)}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500 text-sm italic bg-gray-750 p-2 rounded text-center">Không có lịch</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile view - Single day schedule with divider */}
        <div className="lg:hidden">
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-3">{selectedDay}</h2>
            
            <div className="mb-4">
              <div className="font-semibold mb-3 flex items-center bg-gray-700 p-2 rounded">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                Buổi sáng
              </div>
              {scheduleData[selectedDay].morning.length > 0 ? (
                scheduleData[selectedDay].morning.map((entry, i) => (
                  <div key={i} className="mb-3">{renderAppointment(entry)}</div>
                ))
              ) : (
                <div className="text-center py-3 text-gray-500 bg-gray-750 rounded">
                  Không có lịch hẹn buổi sáng
                </div>
              )}
            </div>
            
            {/* Divider */}
            <div className="border-t-2 border-gray-700 my-4"></div>
            
            <div>
              <div className="font-semibold mb-3 flex items-center bg-gray-700 p-2 rounded">
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                Buổi chiều
              </div>
              {scheduleData[selectedDay].afternoon.length > 0 ? (
                scheduleData[selectedDay].afternoon.map((entry, i) => (
                  <div key={i} className="mb-3">{renderAppointment(entry)}</div>
                ))
              ) : (
                <div className="text-center py-3 text-gray-500 bg-gray-750 rounded">
                  Không có lịch hẹn buổi chiều
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Day Navigation for Mobile */}
          <div className="mt-4 flex overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-3 py-2 mx-1 rounded-lg ${
                  selectedDay === day 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 border border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">{day}</div>
                  {hasAppointments(day) && (
                    <div className="mt-1 text-xs">
                      {countAppointments(day)} lịch
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;