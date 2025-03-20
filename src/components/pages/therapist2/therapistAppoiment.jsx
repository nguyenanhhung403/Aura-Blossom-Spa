import React, { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaFilter,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const TherapistAppointments = () => {
 

  // Dữ liệu mẫu cho danh sách đặt lịch
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      status: "Đã hoàn thành",
      note: "",
      noteThera: "",
    },
    {
      id: 2,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      status: "Đã hoàn thành",
      note: "",
      noteThera: "",
    },
    {
      id: 3,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      status: "Đã hoàn thành",
      note: "",
      noteThera: "",
    },
    {
      id: 4,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      status: "Đã hoàn thành",
      note: "",
      noteThera: "",
    },
    {
      id: 5,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      status: "Đã hoàn thành",
      note: "",
      noteThera: "",
    },
  ]);
};
  export default TherapistAppointments;