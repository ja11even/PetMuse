import styled from "styled-components";
import { useEffect, useState } from "react";
import Select from "react-select";
const hours = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1),
  value: String(i + 1),
}));
const minutes = Array.from({ length: 60 }, (_, i) => ({
  label: String(i).padStart(2, "0"),
  value: String(i).padStart(2, "0"),
}));
const periods = ["AM", "PM"].map((p) => ({ value: p, label: p }));
export default function TimePicker({ value, onChange }) {
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    if (value) {
      const [time, period] = value.split(" ");
      let [hour, minute] = time.split(":");
      setSelectedHour({ label: hour, value: hour });
      setSelectedMinute({ label: minute, value: minute });
      setSelectedPeriod({ label: period, value: period });
    }
  }, [value]);

  function handleTimeChange(h, m, p) {
    if (!h || !m || !p) return;
    console.log(h, m, p);
    const formattedTime = `${h.value}:${m.value} ${p.value}`;
    onChange(formattedTime);
  }
  const customStyle = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#ffffff",
      borderColor: state.isFocused ? "#ed4a2f" : "#ed4a2f",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        borderColor: "#ed4a2f",
        cursor: "pointer",
      },
      height: "45px",
      fontSize: "1rem",
      borderRadius: "5px",
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? "#ffffff" : "#000000",
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#ed4a2f" : "#ffffff",
      padding: "10px 15px",
      fontSize: "1rem",
      borderRadius: "5px",
      fontFamily: "inherit",
      textAlign: "center",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      "&:active": {
        backgroundColor: "#ed4a2f",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "5px",
      backgroundColor: "#ffffff",
      padding: "0px 5px",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      overflowY: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#ed4a2f",
      "&:hover": {
        color: "#ed4a2f",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (base) => ({
      ...base,
      fontFamily: "inherit",
    }),
  };
  return (
    <TimePickerContainer>
      <Select
        options={hours}
        value={selectedHour}
        onChange={(val) => {
          setSelectedHour(val);
          handleTimeChange(val, selectedMinute, selectedPeriod);
        }}
        placeholder="HH"
        styles={customStyle}
      />
      <Separator>:</Separator>
      <Select
        options={minutes}
        value={selectedMinute}
        onChange={(val) => {
          setSelectedMinute(val);
          handleTimeChange(selectedHour, val, selectedPeriod);
        }}
        placeholder="MM"
        styles={customStyle}
      />
      <Select
        options={periods}
        value={selectedPeriod}
        onChange={(val) => {
          setSelectedPeriod(val);
          handleTimeChange(selectedHour, selectedMinute, val);
        }}
        placeholder="AM/PM"
        styles={customStyle}
      />
    </TimePickerContainer>
  );
}
const TimePickerContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Separator = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
  color: #ed4a2f;
`;
