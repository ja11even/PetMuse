import Modal from "react-modal";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  useAddAppointments,
  useDeleteAppointments,
  useUpdateAppointments,
} from "../Hooks/useAppointments";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { useUser } from "../Hooks/useUser";
import { Calendar, Trash, Trash2, X } from "lucide-react";
import TimePicker from "./TimePicker";
import SpinnerMini from "./SpinnerMini";
import Select from "react-select";
import { useSelectedPet } from "./useSelectedPet";
import { RemoveScroll } from "react-remove-scroll";
import DateInput from "./DateInput";
import { format } from "date-fns";
const emptyDefaultValues = {
  event_title: "",
  event_type: null,
  time: "",
  description: "",
  location: "",
  veterinarian: "",
  reminder_date: null,
  reminder_time: "",
};
function AppointmentModal({
  isOpen,
  onClose,
  selectedDate,
  existingAppointment = null,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm({ defaultValues: emptyDefaultValues });
  const { user } = useUser();
  const addAppointment = useAddAppointments();
  const updateAppointment = useUpdateAppointments();
  const deleteAppointment = useDeleteAppointments();
  const selectedType = watch("event_type");
  const { selectedPet } = useSelectedPet();
  const onCloseAndReset = () => {
    reset(emptyDefaultValues);
    onClose();
  };

  useEffect(() => {
    if (existingAppointment) {
      setValue("event_title", existingAppointment.event_title);
      setValue("event_type", existingAppointment.event_type);
      setValue("time", existingAppointment.time);
      setValue("description", existingAppointment.description);
      setValue("location", existingAppointment.location);
      setValue("veterinarian", existingAppointment.veterinarian);
      setValue("reminder_time", existingAppointment.reminder_time);
      setValue("reminder_date", existingAppointment.reminder_date);
    } else {
      reset();
    }
  }, [existingAppointment, reset, setValue]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function convert24hrs(timeStr) {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours, 10);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }
  function onSubmit(data) {
    const hrs = convert24hrs(data.reminder_time);
    const dateStr = format(data.reminder_date, "yyyy-MM-dd");
    const appointmentData = {
      ...data,
      date: selectedDate,
      user_id: user?.id,
      pet_id: selectedPet?.id,
      reminder_at:
        data.reminder_date && data.reminder_time
          ? new Date(`${dateStr}T${hrs}`).toISOString()
          : null,
    };
    if (existingAppointment) {
      updateAppointment.mutate(
        {
          id: existingAppointment.id,
          updates: appointmentData,
        },
        {
          onSuccess: onCloseAndReset,
        }
      );
    } else {
      addAppointment.mutate(appointmentData, { onSuccess: onCloseAndReset });
    }
  }

  function handleDelete() {
    if (existingAppointment) {
      deleteAppointment.mutate(existingAppointment.id, { onSuccess: onClose });
    }
  }

  if (!isOpen) return null;

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
      maxHeight: "290px",
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseAndReset}
      shouldCloseOnOverlayClick={true}
      overlayClassName="ReactModal__Overlay"
      className="ReactModal__Content"
    >
      <ModalContainer>
        <HeaderContainer>
          <HeaderContainer1>
            <HeaderTitleContainer>
              <Title>{existingAppointment ? "Edit" : "Add"} Appointment</Title>
            </HeaderTitleContainer>
            <SubHeader>
              {existingAppointment ? "Edit a" : "Create a"} calendar event for
              your pet
            </SubHeader>
          </HeaderContainer1>
          <HeaderContainer2>
            <CloseButton onClick={onCloseAndReset}>
              <X size={20} color="red" />
            </CloseButton>
          </HeaderContainer2>
        </HeaderContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EventsContainer>
            <EventTitleContainer>
              <Label>Event Title</Label>
              <Input
                placeholder="e.g. Annual Checkup"
                {...register("event_title", { required: true })}
              />
              {errors.event_title && <Error>This field is required</Error>}
            </EventTitleContainer>
            <EventTypeContainer>
              <Label>Event Type</Label>
              <Controller
                control={control}
                name="event_type"
                rules={{ required: true }}
                render={({ field }) => {
                  const eventTypeOptions = [
                    { value: "vet", label: "Vet Visit" },
                    { value: "grooming", label: "Grooming" },
                    { value: "medication", label: "Medication" },
                    { value: "training", label: "Training" },
                    { value: "other", label: "Other" },
                  ];
                  const selectedEventType = eventTypeOptions.find(
                    (opt) => opt.value === field.value
                  );
                  return (
                    <Select
                      {...field}
                      value={selectedEventType}
                      onChange={(selectedEventType) =>
                        field.onChange(
                          selectedEventType ? selectedEventType.value : null
                        )
                      }
                      options={eventTypeOptions}
                      styles={customStyle}
                      placeholder="Select type"
                      isSearchable={false}
                    />
                  );
                }}
              />
              {errors.event_type && <Error>This field is required</Error>}
            </EventTypeContainer>
          </EventsContainer>
          {selectedType === "vet" && (
            <VetContainer>
              <Label>Veterinarian</Label>
              <Input
                {...register("veterinarian")}
                placeholder="e.g. Dr Smith"
              />
            </VetContainer>
          )}
          <LocationTimeContainer>
            <LocationContainer>
              <Label>Location</Label>
              <Input
                placeholder="e.g. Happy Paws Veterinary Clinic"
                {...register("location", { required: true })}
              />
              {errors.location && <Error>This field is required</Error>}
            </LocationContainer>
            <TimeContainer>
              <Label>Time</Label>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TimePicker value={field.value} onChange={field.onChange} />
                )}
              />
            </TimeContainer>
          </LocationTimeContainer>
          <ReminderContainer>
            <ReminderDayContainer>
              <Label>Reminder Date</Label>
              <Controller
                name="reminder_date"
                control={control}
                render={({ field }) => (
                  <DateInput
                    onSelect={field.onChange}
                    selectedDate={field.value}
                  />
                )}
              />
            </ReminderDayContainer>
            <ReminderTimeContainer>
              <Label>Reminder Time</Label>
              <Controller
                name="reminder_time"
                control={control}
                render={({ field }) => (
                  <TimePicker onChange={field.onChange} value={field.value} />
                )}
              />
            </ReminderTimeContainer>
          </ReminderContainer>
          <DescriptionContainer>
            <Label>Description</Label>
            <DescriptionText
              {...register("description")}
              placeholder="Optional notes..."
            />
          </DescriptionContainer>

          <Buttons>
            <ButtonContainer1>
              {existingAppointment && (
                <>
                  <MobileDeleteButton
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteAppointment.isPending}
                  >
                    <Trash2 />
                  </MobileDeleteButton>
                  <DeleteButton
                    type="button"
                    onClick={handleDelete}
                    disabled={deleteAppointment.isPending}
                  >
                    {deleteAppointment.isPending ? (
                      <SpinnerMini
                        width="1.6rem"
                        height="1.6rem"
                        color="white"
                      />
                    ) : (
                      "Delete"
                    )}
                  </DeleteButton>
                </>
              )}
            </ButtonContainer1>
            <ButtonContainer2>
              <CancelButton type="button" onClick={onCloseAndReset}>
                Cancel
              </CancelButton>
              <SaveButton
                type="submit"
                disabled={
                  addAppointment.isPending || updateAppointment.isPending
                }
              >
                {addAppointment.isPending || updateAppointment.isPending ? (
                  <SpinnerMini width="1.6rem" height="1.6rem" color="white" />
                ) : existingAppointment ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </SaveButton>
            </ButtonContainer2>
          </Buttons>
        </Form>
      </ModalContainer>
    </Modal>
  );
}
const ModalContainer = styled.div`
  background: white;
  padding: 1.5rem;
  padding-bottom: 1.7rem;
  width: 650px;
  border-radius: 10px;
  display: flex;
  height: 600px;
  margin-left: 15px;
  flex-direction: column;
  overflow-y: auto;
  gap: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (max-width: 767px) {
    padding: 1.2rem;
    padding-bottom: 2rem;
    max-width: 92%;
    height: 500px;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeaderContainer1 = styled.div``;
const HeaderContainer2 = styled.div``;
const HeaderTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 50px;
`;
const SubHeader = styled.p`
  margin-top: -7px;
  font-size: 1rem;
`;
const EventsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const EventTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
`;
const EventTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
`;
const LocationTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0rem;
    flex-direction: column;
  }
`;
const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  height: 120px;
`;
const VetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const LocationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ButtonContainer1 = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonContainer2 = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Title = styled.h2`
  color: #ed4a2f;
  font-family: "MyFont";
  font-weight: 500;
`;
const Form = styled.form``;
const Label = styled.label`
  margin-top: 1rem;
`;

const Option = styled.option``;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
const DescriptionText = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid red;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  overflow-y: scroll;
  line-height: 1.4;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &:focus {
    outline: none;
  }
`;
const ReminderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0rem;
    flex-direction: column;
    align-items: normal;
  }
`;
const ReminderDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const ReminderTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Input = styled.input`
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
  &::placeholder {
    font-family: inherit;
  }
`;
const Buttons = styled.div`
  margin-top: 3.5rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;
const DeleteButton = styled.button`
  padding: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.9rem;
  border: none;
  background-color: red;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1rem;
  height: 45px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const MobileDeleteButton = styled.button`
  display: none;
  @media (max-width: 767px) {
    display: block;
    color: #ed4a2f;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
  }
`;
const CancelButton = styled.button`
  padding: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border: none;
  border: 1px solid #ed4a2f;
  background-color: transparent;
  color: #ed4a2f;
  font-size: 1rem;
  border-radius: 5px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
const SaveButton = styled.button`
  padding: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border: none;
  background-color: #ed4a2f;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1rem;
  width: 90px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  &:hover {
    cursor: pointer;
  }
`;
const CloseButton = styled.button`
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
export default AppointmentModal;
