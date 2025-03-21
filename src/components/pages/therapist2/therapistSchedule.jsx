import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const TherapistSchedule = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);

  // Hàm format giờ thành chuỗi "HH:mm"
  const formatTime = (date) => moment(date).format("HH:mm");

  // Gọi API lấy lịch làm việc
  useEffect(() => {
    fetch("https://your-api.com/therapist-schedule")
      .then((res) => res.json())
      .then((data) => {
        // Chuyển đổi dữ liệu từ API thành định dạng của react-big-calendar
        const formattedEvents = data.map((event) => ({
          id: event.id,
          title: `${event.title} (${formatTime(event.startTime)} - ${formatTime(event.endTime)})`,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          canceled: event.canceled,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu lịch:", error));
  }, []);

  // Hàm đổi màu sự kiện nếu bị hủy
  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.canceled ? "red" : "#28a745",
        color: "white",
        borderRadius: "6px",
        padding: "4px",
        fontSize: "14px",
      },
    };
  };

  return (
    <div className="calendar-container">
      <h2>Lịch làm việc của bác sĩ</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
        view={view}
        onView={(newView) => setView(newView)}
        defaultView={Views.WEEK}
        min={new Date(2025, 2, 24, 8, 0)}
        max={new Date(2025, 2, 24, 22, 0)}
        step={30}
        timeslots={2}
        showMultiDayTimes
        style={{ height: "80vh", width: "100%" }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default TherapistSchedule;
