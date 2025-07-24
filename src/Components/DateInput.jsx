import { useState } from "react";
import {
  useFloating,
  offset,
  useClick,
  useDismiss,
  useInteractions,
} from "@floating-ui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import styled from "styled-components";
function DateInput({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    middleware: [offset(4)],
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);
  function handleSelect(date) {
    if (date instanceof Date) {
      onSelect(date);
      setOpen(false);
    }
  }
  return (
    <DateInputContainer>
      <DateField
        ref={refs.setReference}
        value={selectedDate instanceof Date ? format(selectedDate, "PPP") : ""}
        readOnly
        {...getReferenceProps()}
      />
      {open && (
        <CalendarWrapper
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <CustomCalendarStyles>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              toDate={new Date()}
            />
          </CustomCalendarStyles>
        </CalendarWrapper>
      )}
    </DateInputContainer>
  );
}
const DateInputContainer = styled.div`
  position: relative;
`;
const DateField = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  padding: 0.6rem;
  border: 1px solid #ed4a2f;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
  }
`;
const CalendarWrapper = styled.div`
  position: absolute;
  z-index: 10;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CustomCalendarStyles = styled.div`
  padding: 1rem;
  font-family: inherit;
  .rdp-day:hover {
    background-color: #fffaf4;
    color: #ed4a2f;
    cursor: pointer;
    border-radius: 50%;
  }
  .rdp-root {
    --rdp-today-color: green;
    --rdp-nav-button-color: green;
  }
`;

export default DateInput;
