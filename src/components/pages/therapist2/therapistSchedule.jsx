import React, { useState, useEffect, useContext } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getSlotsByTherapist } from "../../service/slotApi";
import { UserContext } from "../../context/UserContext";

const localizer = momentLocalizer(moment);

const TherapistSchedule = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);

  // Hàm format giờ thành chuỗi "HH:mm"
  const formatTime = (timeStr) => timeStr.substring(0, 5);

  // Gọi API lấy lịch làm việc
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSlotsByTherapist(user.id);
        if (response.code === 1000) {
          const formattedEvents = response.result.map((slot) => {
            const [hours, minutes] = slot.time.split(':');
            const startDate = new Date(slot.date);
            startDate.setHours(parseInt(hours), parseInt(minutes), 0);
            
            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + 1);

            const isAvailable = slot.therapists[0].status === "AVAILABLE";

            return {
              id: slot.id,
              start: startDate,
              end: endDate,
              isAvailable: isAvailable
            };
          });
          setEvents(formattedEvents);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch:", error);
      }
    };
    fetchData();
  }, []);

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: event.isAvailable ? "#28a745" : "#dc3545",
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
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 19, 0)}
        step={60}
        timeslots={1}
        showMultiDayTimes
        style={{ height: "80vh", width: "100%" }}
        eventPropGetter={eventPropGetter}
      />
    </div>
  );
};

export default TherapistSchedule;
