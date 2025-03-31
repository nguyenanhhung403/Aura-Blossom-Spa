import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./SideBar";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getAllTherapists } from "../../service/therapistsApi";
import {
  deleteSlot,
  deleteSlotByDateAndTherapist,
  generateSlotsForDateRange,
  generateSlotsForDay,
  getAllSlots,
} from "../../service/slotApi";

const ModalForm = ({
  isOpen,
  setIsOpen,
  setSelectedId,
  selectedId,
  options,
  handleSubmit,
}) => {
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSelectChange = (e) => {
    setSelectedId(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (selectedId) {
      handleSubmit(selectedId);
      closeModal();
    } else {
      alert("Vui lòng chọn một đối tượng.");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-black rounded-xl p-6 w-96 shadow-2xl relative border border-gray-700">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Select Therapist
            </h2>

            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-white">
                  Select an therapist
                </label>
                <select
                  value={selectedId}
                  onChange={handleSelectChange}
                  className="w-full p-2 border border-gray-600 rounded bg-black text-white focus:border-white focus:ring-white"
                >
                  <option value="" className="text-white bg-black">
                    -- Please select --
                  </option>
                  {options.length > 0 &&
                    options.map((option) => (
                      <option
                        key={option.id}
                        value={option.id}
                        className="text-white bg-black"
                      >
                        {option.name}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded w-full hover:bg-gray-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const SlotsTable = ({ slots, deleteAppointment }) => {
  const groupedSlots = useMemo(() => groupSlotsByDate(slots), [slots]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [options, setOptions] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const openModal = (date, therapists) => {
    setCurrentDate(date);
    const uniqueOptions = Array.from(
      therapists
        .reduce((map, therapist) => {
          if (!map.has(therapist.id)) {
            map.set(therapist.id, {
              id: therapist.id,
              name: therapist.fullname,
            });
          }
          return map;
        }, new Map())
        .values()
    );

    setOptions(uniqueOptions);
    // setOptions(therapists.map((t) => ({ id: t.id, name: t.fullname })));
    setIsOpen(true);
  };

  const handleDeleteSubmit = (therapistId) => {
    deleteAppointment(currentDate, therapistId);
  };
  return (
    <table className="w-full border-collapse text-left">
      <thead>
        <tr>
          {Object.keys(groupedSlots).map((date, index) => (
            <th
              key={date}
              className={`bg-gray-800 p-3 font-medium ${
                index < Object.keys(groupedSlots).length - 1
                  ? "border-r border-gray-600"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{date}</span>
                <button
                  onClick={() =>
                    openModal(
                      date,
                      groupedSlots[date].flatMap((slot) => slot.therapists)
                    )
                  }
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs ml-2"
                >
                  <FaTrash />
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {Object.keys(groupedSlots).map((date, index) => (
            <td
              key={date}
              className={`bg-gray-800 p-3 align-top ${
                index < Object.keys(groupedSlots).length - 1
                  ? "border-r border-gray-600"
                  : ""
              }`}
            >
              {groupedSlots[date].map((slot, i) => (
                <div key={i} className="mb-2">
                  <div className="bg-gray-750 p-2 rounded mb-2">
                    <div className="text-white font-medium">{slot.time}</div>
                    <div className="text-gray-400 text-sm">
                      {slot.therapists.map((therapist, j) => (
                        <div
                          key={j}
                          className="flex items-center justify-between mb-1"
                        >
                          {" "}
                          <span>
                            {therapist.fullname} - {therapist.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
      <ModalForm
        options={options}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        handleSubmit={handleDeleteSubmit}
      />
    </table>
  );
};
const groupSlotsByDate = (slots) => {
  return slots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});
};

const WorkSchedule = () => {
  // State để theo dõi khoảng thời gian xem lịch
  const [dateRange, setDateRange] = useState({
    startDate: "2025-03-10",
    endDate: "2025-03-16",
  });

  // State cho modal tạo lịch mới
  const [showCreateModal, setShowCreateModal] = useState(false);

  // State cho lịch hẹn mới
  const [newAppointment, setNewAppointment] = useState({
    selectedDoctors: [],
    startDate: "",
    endDate: "",
    singleDates: [],
  });

  const [doctors, setDoctors] = useState([]);

  const [slots, setSlots] = useState([]);

  const sortSlots = (slots) => {
    return slots.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA.getTime() === dateB.getTime()) {
        const timeA = a.time.split(":").map(Number);
        const timeB = b.time.split(":").map(Number);

        if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
        if (timeA[1] !== timeB[1]) return timeA[1] - timeB[1];
        return timeA[2] - timeB[2];
      }
      return dateA - dateB;
    });
  };

  useEffect(() => {
    const fetchAllTherapists = async () => {
      try {
        const response = await getAllTherapists();

        setDoctors(response.result || []);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    const fetchAllSlots = async () => {
      try {
        const response = await getAllSlots();
        const sortedSlots = sortSlots(response.result);
        const filteredSlots = sortedSlots.filter(
          (slot) => slot.therapists && slot.therapists.length > 0
        );
        setSlots(filteredSlots || []);
        console.error("Error fetching therapists:", error);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchAllSlots();
    fetchAllTherapists();
  }, []);
  // Danh sách bác sĩ
  // const doctors = [
  //   "Bác sĩ A", "Bác sĩ B", "Bác sĩ C", "Bác sĩ D", "Bác sĩ E",
  //   "Bác sĩ F", "Bác sĩ G", "Bác sĩ H", "Bác sĩ K", "Bác sĩ L",
  //   "Bác sĩ M", "Bác sĩ N", "Bác sĩ P", "Bác sĩ Q", "Bác sĩ R"
  // ];

  // State để theo dõi tuần hiện tại
  const [currentWeek, setCurrentWeek] = useState(0); // 0: tuần hiện tại, -1: tuần trước, 1: tuần sau

  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dữ liệu lịch làm việc theo ngày
  const [calendarData, setCalendarData] = useState({
    "2025-03-10": [
      { id: 1, doctor: "Bác sĩ A" },
      { id: 2, doctor: "Bác sĩ B" },
    ],
    "2025-03-11": [
      { id: 3, doctor: "Bác sĩ C" },
      { id: 4, doctor: "Bác sĩ D" },
    ],
    "2025-03-12": [{ id: 5, doctor: "Bác sĩ E" }],
    "2025-03-13": [{ id: 6, doctor: "Bác sĩ F" }],
    "2025-03-14": [{ id: 7, doctor: "Bác sĩ G" }],
    "2025-03-15": [{ id: 8, doctor: "Bác sĩ H" }],
    "2025-03-16": [{ id: 9, doctor: "Bác sĩ K" }],
  });

  // Dữ liệu lịch tuần trước
  const [previousCalendarData, setPreviousCalendarData] = useState({
    "2025-02-22": [{ id: 101, doctor: "Bác sĩ L" }],
    "2025-02-23": [{ id: 102, doctor: "Bác sĩ M" }],
    "2025-02-24": [{ id: 103, doctor: "Bác sĩ N" }],
    "2025-02-25": [{ id: 104, doctor: "Bác sĩ P" }],
    "2025-02-26": [{ id: 105, doctor: "Bác sĩ Q" }],
    "2025-02-27": [{ id: 106, doctor: "Bác sĩ R" }],
    "2025-02-28": [
      { id: 107, doctor: "Bác sĩ A" },
      { id: 108, doctor: "Bác sĩ B" },
    ],
  });

  // Dữ liệu lịch tuần sau
  const nextCalendarData = {
    "2025-03-17": [{ id: 201, doctor: "Bác sĩ A" }],
    "2025-03-18": [{ id: 202, doctor: "Bác sĩ B" }],
    "2025-03-19": [{ id: 203, doctor: "Bác sĩ C" }],
    "2025-03-20": [{ id: 204, doctor: "Bác sĩ D" }],
    "2025-03-21": [{ id: 205, doctor: "Bác sĩ E" }],
    "2025-03-22": [{ id: 206, doctor: "Bác sĩ F" }],
    "2025-03-23": [{ id: 207, doctor: "Bác sĩ G" }],
  };

  // Dữ liệu các tuần
  const weeks = [
    {
      id: "week1",
      label: "Tuần 1 (01/03 - 07/03)",
      startDate: "2025-03-01",
      endDate: "2025-03-07",
    },
    {
      id: "week2",
      label: "Tuần 2 (08/03 - 14/03)",
      startDate: "2025-03-08",
      endDate: "2025-03-14",
    },
    {
      id: "week3",
      label: "Tuần 3 (15/03 - 21/03)",
      startDate: "2025-03-15",
      endDate: "2025-03-21",
    },
    {
      id: "week4",
      label: "Tuần 4 (22/03 - 28/03)",
      startDate: "2025-03-22",
      endDate: "2025-03-28",
    },
    {
      id: "week5",
      label: "Tuần 5 (29/03 - 31/03)",
      startDate: "2025-03-29",
      endDate: "2025-03-31",
    },
  ];

  // Lấy dữ liệu lịch dựa vào tuần hiện tại
  const getActiveCalendarData = () => {
    if (currentWeek === 0) return calendarData;
    if (currentWeek === -1) return previousCalendarData;
    return nextCalendarData;
  };

  // Lấy danh sách ngày dựa vào khoảng thời gian
  const getDatesInRange = () => {
    const data = getActiveCalendarData();
    return Object.keys(data).sort();
  };

  // State to track selected day for mobile view
  const [selectedDate, setSelectedDate] = useState(getDatesInRange()[0] || "");

  // Function to count total appointments for a day
  const countAppointments = (date) => {
    const activeData = getActiveCalendarData();
    return activeData[date]?.length || 0;
  };

  // Function to determine if a day has any appointments
  const hasAppointments = (date) => {
    return countAppointments(date) > 0;
  };

  // Xóa lịch hẹn
  const deleteAppointment = async (date, id) => {
    try {
      const response = await deleteSlotByDateAndTherapist(id, date);
      const updatedSlots = slots
        .map((slot) => {
          if (slot.date === date) {
            const filteredTherapists = slot.therapists.filter(
              (therapist) => therapist.id !== parseInt(id)
            );

            return { ...slot, therapists: filteredTherapists };
          }
          return slot;
        })
        .filter((slot) => slot.therapists.length > 0);

      setSlots(updatedSlots);
      console.log(response);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Cập nhật khoảng thời gian
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Tìm kiếm lịch hẹn
  const searchAppointments = () => {
    setIsSearching(true);
    const results = [];
    const activeData = getActiveCalendarData();

    // Chuyển đổi khoảng thời gian thành đối tượng Date để so sánh
    const startDateObj = new Date(dateRange.startDate);
    const endDateObj = new Date(dateRange.endDate);

    // Đảm bảo endDate là cuối ngày (23:59:59)
    endDateObj.setHours(23, 59, 59, 999);

    console.log(
      `Hiển thị tất cả lịch hẹn trong khoảng: ${dateRange.startDate} đến ${dateRange.endDate}`
    );

    // Lấy tất cả lịch hẹn trong khoảng thời gian đã chọn
    Object.entries(activeData).forEach(([date, appointments]) => {
      // Kiểm tra xem ngày có nằm trong khoảng thời gian đã chọn không
      const currentDateObj = new Date(date);
      const isInDateRange =
        currentDateObj >= startDateObj && currentDateObj <= endDateObj;

      // Chỉ lấy lịch hẹn trong khoảng thời gian đã chọn
      if (isInDateRange) {
        // Thêm tất cả các lịch hẹn của ngày này vào kết quả
        const dateFormatted = formatDate(date);
        appointments.forEach((appointment) => {
          results.push({
            ...appointment,
            date,
            dateFormatted: dateFormatted,
          });
        });
      }
    });

    setSearchResults(results);
    setSearchTerm(""); // Xóa từ khóa tìm kiếm vì không cần thiết nữa

    // Hiển thị thông báo về số lượng lịch hẹn tìm thấy
    if (results.length === 0) {
      console.log(
        `Không có lịch hẹn nào trong khoảng ${dateRange.startDate} - ${dateRange.endDate}`
      );
    } else {
      console.log(
        `Tìm thấy ${results.length} lịch hẹn trong khoảng ${dateRange.startDate} - ${dateRange.endDate}`
      );
    }
  };

  // Xử lý khi searchTerm thay đổi - không cần thiết nữa vì không dùng searchTerm
  useEffect(() => {
    if (!isSearching) {
      setSearchResults([]);
    }
  }, [isSearching]);

  // Lấy ngày hiện tại và giới hạn theo tuần
  const getCurrentDateString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getStartOfWeek = () => {
    const today = new Date();
    const diff =
      today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1); // Điều chỉnh cho tuần bắt đầu từ thứ 2
    const startOfWeek = new Date(today.setDate(diff));
    return startOfWeek.toISOString().split("T")[0];
  };

  const getMaxDateString = () => {
    const today = new Date();
    const startOfWeek = new Date(getStartOfWeek());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Thêm 6 ngày để đến cuối tuần (Chủ nhật)
    return endOfWeek.toISOString().split("T")[0];
  };

  // Kiểm tra ngày có hợp lệ không (không trong quá khứ và trong tuần hiện tại)
  const isValidDate = (dateString) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(dateString);
    const startOfWeek = new Date(getStartOfWeek());
    const endOfWeek = new Date(getMaxDateString());
    return (
      checkDate >= today && checkDate >= startOfWeek && checkDate <= endOfWeek
    );
  };

  // Xử lý thay đổi trong form tạo lịch mới
  const handleNewAppointmentChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu ngày được chọn không hợp lệ
    if ((name === "startDate" || name === "endDate") && !isValidDate(value)) {
      alert("Không thể chọn ngày trong quá khứ!");
      return;
    }

    // Kiểm tra nếu ngày kết thúc vượt quá 7 ngày
    if (name === "endDate") {
      const maxDate = new Date(getMaxDateString());
      const selectedDate = new Date(value);
      if (selectedDate > maxDate) {
        alert("Chỉ có thể đặt lịch trong vòng 7 ngày!");
        return;
      }
    }

    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý chọn bác sĩ
  const handleDoctorSelection = (doctor) => {
    setNewAppointment((prev) => {
      const selectedDoctors = [...prev.selectedDoctors];

      if (selectedDoctors.includes(doctor)) {
        // Nếu đã chọn thì bỏ chọn
        return {
          ...prev,
          selectedDoctors: selectedDoctors.filter((d) => d !== doctor),
        };
      } else {
        // Nếu chưa chọn thì thêm vào
        return {
          ...prev,
          selectedDoctors: [...selectedDoctors, doctor],
        };
      }
    });
  };

  // Chọn tất cả bác sĩ
  const selectAllDoctors = () => {
    setNewAppointment((prev) => ({
      ...prev,
      selectedDoctors: [...doctors],
    }));
  };

  // Bỏ chọn tất cả bác sĩ
  const deselectAllDoctors = () => {
    setNewAppointment((prev) => ({
      ...prev,
      selectedDoctors: [],
    }));
  };

  // Tạo ID mới cho lịch hẹn
  const generateNewId = () => {
    const activeData = getActiveCalendarData();
    let maxId = 0;

    // Tìm ID lớn nhất hiện tại
    Object.values(activeData).forEach((appointments) => {
      appointments.forEach((app) => {
        if (app.id > maxId) maxId = app.id;
      });
    });

    return maxId + 1;
  };

  // Format ngày hiển thị
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const weekday = getWeekdayFromDate(dateString);
    return `${day}/${month} (${weekday})`;
  };

  // Chuyển đổi ngày thành thứ
  const getWeekdayFromDate = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    // Chuyển từ 0-6 (Chủ nhật - Thứ 7) sang Thứ 2 - Chủ nhật
    const weekdays = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];
    return weekdays[dayOfWeek];
  };

  // Xử lý chọn ngày riêng lẻ
  const handleSingleDateSelection = (date) => {
    // Kiểm tra ngày có hợp lệ không
    if (!isValidDate(date)) {
      alert("Không thể chọn ngày trong quá khứ!");
      return;
    }

    // Kiểm tra ngày có nằm trong khoảng 7 ngày không
    const maxDate = new Date(getMaxDateString());
    const selectedDate = new Date(date);
    if (selectedDate > maxDate) {
      alert("Chỉ có thể đặt lịch trong vòng 7 ngày!");
      return;
    }

    setNewAppointment((prev) => {
      const singleDates = [...prev.singleDates];

      if (singleDates.includes(date)) {
        return {
          ...prev,
          singleDates: singleDates.filter((d) => d !== date),
        };
      } else {
        return {
          ...prev,
          singleDates: [...singleDates, date].sort(),
        };
      }
    });
  };

  // Lưu lịch hẹn mới
  const saveNewAppointment = async () => {
    // Kiểm tra dữ liệu
    if (newAppointment.selectedDoctors.length === 0) {
      alert("Vui lòng chọn ít nhất một bác sĩ!");
      return;
    }

    let startId = generateNewId();
    let newSlots = [];

    // Nếu có chọn khoảng thời gian
    if (newAppointment.startDate && newAppointment.endDate) {
      const startDate = new Date(newAppointment.startDate);
      const endDate = new Date(newAppointment.endDate);
      const maxDate = new Date(getMaxDateString());

      if (startDate > endDate) {
        alert("Ngày bắt đầu phải trước ngày kết thúc!");
        return;
      }

      if (endDate > maxDate) {
        alert("Chỉ có thể đặt lịch trong vòng 7 ngày!");
        return;
      }

      try {
        const response = await generateSlotsForDateRange(
          newAppointment.startDate,
          newAppointment.endDate,
          newAppointment.selectedDoctors
        );
        console.log(response);
        if (response && response.result) {
          newSlots = [...newSlots, ...response.result]; // Thêm các slot mới vào mảng newSlots
        }
      } catch (e) {
        console.log(e);
      }
    }

    // Thêm lịch cho các ngày riêng lẻ
    if (newAppointment.singleDates.length > 0) {
      try {
        const response = await generateSlotsForDay({
          date: newAppointment.singleDates[0],
          therapistIds: newAppointment.selectedDoctors.map((doctor) =>
            Number.parseInt(doctor.id)
          ),
        });
        if (response && response.result) {
          newSlots = [...newSlots, ...response.result]; // Thêm các slot mới vào mảng newSlots
        }
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    }
    setSlots((prevSlots) => sortSlots([...prevSlots, ...newSlots]));

    // Reset form và đóng modal
    setNewAppointment({
      selectedDoctors: [],
      startDate: "",
      endDate: "",
      singleDates: [],
    });
    setShowCreateModal(false);
  };

  // Hàm hỗ trợ thêm lịch hẹn vào một ngày cụ thể
  const addAppointmentsToDate = (dateString, startId) => {
    const updateFunction = (prevData) => {
      const newData = { ...prevData };

      // Khởi tạo mảng nếu chưa có dữ liệu cho ngày này
      if (!newData[dateString]) {
        newData[dateString] = [];
      }

      // Lấy danh sách bác sĩ đã có lịch trong ngày này
      const existingDoctors = newData[dateString].map((app) => app.doctor);

      // Lọc ra những bác sĩ đã chọn chưa có lịch
      const doctorsToAdd = newAppointment.selectedDoctors.filter(
        (doctor) => !existingDoctors.includes(doctor)
      );

      // Thêm các bác sĩ vào lịch
      doctorsToAdd.forEach((doctor, index) => {
        newData[dateString].push({
          id: startId + index,
          doctor: doctor,
        });
      });

      return newData;
    };

    if (currentWeek === 0) {
      setCalendarData(updateFunction);
    } else {
      setPreviousCalendarData(updateFunction);
    }
  };

  // Render appointment card
  const renderAppointment = (entry, date) => (
    <div className="bg-gray-700 rounded-lg p-2 mb-2 border-l-4 border-blue-400 hover:border-blue-300 transition-all">
      <div className="mt-1 text-gray-200">
        <div className="flex items-center">
          <span className="w-20 text-gray-400">Bác sĩ:</span>
          <span>{entry.doctor}</span>
        </div>
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        <button
          onClick={() => deleteAppointment(date, entry.id)}
          className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );

  // Render kết quả tìm kiếm
  const renderSearchResults = () => (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white">Tất cả lịch hẹn</h2>
          <div className="text-sm text-gray-400 mt-1">
            Trong khoảng: {dateRange.startDate} - {dateRange.endDate}
          </div>
        </div>
        <button
          onClick={() => setIsSearching(false)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          Quay lại
        </button>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-3 border-l-4 border-blue-400"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm text-gray-400">
                    {result.dateFormatted}
                  </div>
                </div>
                <button
                  onClick={() => {
                    deleteAppointment(result.date, result.id);
                    // Cập nhật lại kết quả tìm kiếm sau khi xóa
                    setSearchResults((prev) =>
                      prev.filter((item) => item.id !== result.id)
                    );
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  <FaTrash />
                </button>
              </div>
              <div className="mt-1 text-gray-200">
                <div className="flex items-center">
                  <span className="w-20 text-gray-400">Bác sĩ:</span>
                  <span className="font-medium">{result.doctor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-400 bg-gray-750 rounded">
          Không có lịch hẹn nào trong khoảng thời gian đã chọn
        </div>
      )}
    </div>
  );

  // State để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(0);

  // Lấy danh sách ngày dựa vào trang hiện tại
  const getDatesForCurrentPage = () => {
    const dates = getDatesInRange();
    const startIndex = currentPage * 7;
    const endIndex = startIndex + 7;
    return dates.slice(startIndex, endIndex);
  };

  // Xử lý khi chuyển trang
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Page header */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl text-white">Lịch làm việc</h1>
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

        {/* Search Results */}
        {isSearching && renderSearchResults()}

        {/* Main schedule display - only show when not searching */}
        {!isSearching && (
          <>
            {/* Mobile day selector - only shown on small screens */}
            <div className="lg:hidden mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Chọn ngày:
              </label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {getDatesInRange().map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)}{" "}
                    {hasAppointments(date)
                      ? `(${countAppointments(date)})`
                      : "(Trống)"}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop view - Table layout */}
            <div className="hidden lg:block mb-6 overflow-x-auto">
              <SlotsTable slots={slots} deleteAppointment={deleteAppointment} />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handlePageChange(-1)}
                  disabled={currentPage === 0}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Trước
                </button>
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={(currentPage + 1) * 7 >= getDatesInRange().length}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
                >
                  Sau
                </button>
              </div>
            </div>

            {/* Mobile view - Single day schedule */}
            <div className="lg:hidden">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-center border-b border-gray-700 pb-3">
                  {formatDate(selectedDate)}
                </h2>

                <div>
                  {getActiveCalendarData()[selectedDate]?.length > 0 ? (
                    getActiveCalendarData()[selectedDate].map((entry, i) => (
                      <div key={i} className="mb-3">
                        {renderAppointment(entry, selectedDate)}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-3 text-gray-500 bg-gray-750 rounded">
                      Không có lịch làm việc
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Day Navigation for Mobile */}
              <div className="mt-4 flex overflow-x-auto pb-2">
                {getDatesInRange().map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-3 py-2 mx-1 rounded-lg ${
                      selectedDate === date
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">
                        {formatDate(date).split(" ")[0]}
                      </div>
                      {hasAppointments(date) && (
                        <div className="mt-1 text-xs">
                          {countAppointments(date)} lịch
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal tạo lịch mới */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-white">
              Tạo lịch làm việc mới
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Chọn khoảng thời gian:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Từ ngày:
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    min={getStartOfWeek()}
                    max={getMaxDateString()}
                    value={newAppointment.startDate}
                    onChange={handleNewAppointmentChange}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Đến ngày:
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    min={newAppointment.startDate || getStartOfWeek()}
                    max={getMaxDateString()}
                    value={newAppointment.endDate}
                    onChange={handleNewAppointmentChange}
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm w-full"
                  />
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                *Chỉ có thể đặt lịch trong tuần hiện tại (Thứ 2 - Chủ nhật)
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Hoặc chọn ngày riêng lẻ:
              </label>
              <div className="grid grid-cols-7 gap-1 bg-gray-700 p-2 rounded-md">
                {Array.from({ length: 7 }, (_, i) => {
                  const startOfWeek = new Date(getStartOfWeek());
                  const day = new Date(startOfWeek);
                  day.setDate(startOfWeek.getDate() + i);
                  const date = day.toISOString().split("T")[0];
                  const weekday = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][i];
                  return (
                    <button
                      key={date}
                      onClick={() => handleSingleDateSelection(date)}
                      className={`p-2 text-sm rounded ${
                        newAppointment.singleDates.includes(date)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-600 hover:bg-gray-500 text-gray-200"
                      }`}
                    >
                      <div className="text-xs mb-1">{weekday}</div>
                      <div>{day.getDate()}</div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Đã chọn: {newAppointment.singleDates.length} ngày
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Chọn bác sĩ:
              </label>
              <div className="flex justify-between mb-2">
                <button
                  onClick={selectAllDoctors}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Chọn tất cả
                </button>
                <button
                  onClick={deselectAllDoctors}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Bỏ chọn tất cả
                </button>
              </div>
              <div className="bg-gray-700 border border-gray-600 rounded-md p-3 max-h-60 overflow-y-auto">
                {doctors.length > 0 &&
                  doctors.map((doctor) => (
                    <div key={doctor} className="mb-2 flex items-center">
                      <input
                        type="checkbox"
                        id={`doctor-${doctor}`}
                        checked={newAppointment.selectedDoctors.includes(
                          doctor
                        )}
                        onChange={() => handleDoctorSelection(doctor)}
                        className="mr-2 h-4 w-4"
                      />
                      <label
                        htmlFor={`doctor-${doctor}`}
                        className="cursor-pointer"
                      >
                        {doctor.fullname}
                      </label>
                    </div>
                  ))}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                Đã chọn: {newAppointment.selectedDoctors.length} bác sĩ
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
    </div>
  );
};

export default WorkSchedule;
