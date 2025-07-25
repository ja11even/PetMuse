import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { useAppointments } from "../Hooks/useAppointments";
function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data: appointments = [] } = useAppointments();

  function handleDateClick(date) {
    setSelectedDate(date);
    setShowModal(true);
  }

  function getTileClassName(date, view) {
    if (view !== "month") return "";
    const formattedDate = date.toISOString().split("T")[0];
    const appt = appointments.find((a) => a.date === formattedDate);
    return appt ? `tile-${appt.event_type}` : "";
  }
  return (
    <CalendarContainer>
      <StyledCalendar
        onClickDay={handleDateClick}
        tileClassName={({ date, view }) => getTileClassName(date, view)}
      />
      <AppointmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
        existingAppointment={appointments.find(
          (a) => a.date === selectedDate?.toISOString().split("T")[0]
        )}
      />
    </CalendarContainer>
  );
}
const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCalendar = styled(Calendar)`
  border: none !important;
  width: 100% !important;
  max-width: 800px;
  min-height: 550px;
  height: auto;
  border-radius: 10px;
  padding: 1.5rem;
  padding-top: 1.2rem;
  padding-bottom: 1.7rem;
  font-family: inherit !important;
  box-sizing: border-box;
  @media (max-width: 767px) {
    padding: 1rem;
    padding-top: 1.2rem;
    padding-bottom: 1.7rem;
    min-height: 510px;
  }
  .react-calendar__tile {
    padding: 0.5rem 0.2rem;
    font-size: 1.2rem;
    margin: 0;
    border-radius: 5px;
    transition: 0.2s;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }

    @media (max-width: 767px) {
      padding: 0.5rem;
      height: 45px;
      font-size: 1rem;
    }
  }
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    gap: 5px;
    margin: 0;
    @media (max-width: 1024px) {
      gap: 3px;
    }
    @media (max-width: 767px) {
      gap: 2px;
    }
  }
  .react-calendar__tile--active,
  .react-calendar__tile--hasActive {
    background: transparent !important;
    color: black !important;
  }
  .react-calendar__year-view__months {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    justify-items: center;
  }
  .react-calendar__tile--now {
    background: #fffaf4 !important;
    color: #ed4a2f !important;
    border: 1px solid #ed4a2f;
    @media (max-width: 767px) {
      background: transparent !important;
      border: none !important;
    }
  }
  .react-calendar__tile--active {
    background: #ed4a2f;
    @media (max-width: 767px) {
      background: transparent !important;
      border: none !important;
    }
  }
  .react-calendar__tile:enabled:hover {
    background: #ed4a2f44;
    color: white;
    @media (max-width: 767px) {
      background: transparent !important;
      border: none !important;
    }
  }
  .react-calendar__navigation button {
    color: #ed4a2f;
    font-weight: 400;
    font-size: 1.5rem;
    padding: 0.5rem 0;
    margin-left: 5px;
    border-radius: 10px;
    &:hover {
      background-color: #fffaf4;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
    pointer-events: none;
  }
  .react-calendar__month-view__weekdays {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: #ed4a2f;
    background-color: #fffaf4;
    border-radius: 5px;
    margin-bottom: 10px;
    display: grid !important;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    box-sizing: border-box;

    @media (max-width: 1024px) {
      gap: 3px;
    }
    @media (max-width: 767px) {
      gap: 2px;
    }
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5rem 0.2rem;
    text-align: center;
    box-sizing: border-box;
  }
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    cursor: default;
  }
  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:active {
    background-color: #fffaf4;
    outline: none;
    box-shadow: none;
  }
  .react-calendar__year-view__months__month {
    width: 150px !important;
    margin-top: 35px;
  }
  .react-calendar__navigation__label {
    font-size: 1.3rem !important;
    pointer-events: none;
  }
  .tile-vet {
    background-color: #dbeafe !important;
    color: #1d4ed8 !important;
    border: 1px solid #dbeafe;
  }

  .tile-grooming {
    background-color: #fdecd5 !important;
    color: #c24225 !important;
    border: 1px solid #fdecd5;
  }

  .tile-medication {
    background-color: #dcfbe7 !important;
    color: #3a803e !important;
    border: 1px solid #dcfbe7;
  }

  .tile-training {
    background-color: #f3e8fe !important;
    color: #8044ce !important;
    border: 1px solid #f3e8fe;
  }

  .tile-other {
    background-color: #fbe7f3 !important;
    color: #c13e62 !important;
    border: 1px solid #fbe7f3;
  }
`;
export default CalendarWidget;
