import { X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { useAddHealthlogs, useUpdateHealthlogs } from "../Hooks/useHealthlogs";
import { useUser } from "../Hooks/useUser";
import { useCallback, useEffect, useMemo, useRef } from "react";
import TimePicker from "./TimePicker";
import Select from "react-select";
import DateInput from "./DateInput";
import { format } from "date-fns";
import SpinnerMini from "./SpinnerMini";
import { useSelectedPet } from "./useSelectedPet";
import { RemoveScroll } from "react-remove-scroll";

const emptyDefaultValues = {
  log_type: null,
  title: "",
  notes: "",
  veterinarian: "",
  hospital: "",
  medication: "",
  dosage: "",
  frequency: "",
  due_date: null,
  weight: "",
  unit: null,
  symptoms: "",
  treatment: "",
  reminder_date: null,
  reminder_time: "",
};
function HealthlogsModal({ isOpen, onClose, mode, initialData }) {
  const currentDefaultValues = useMemo(() => {
    return mode === "edit" && initialData
      ? {
          log_type: initialData.log_type ?? null,
          title: initialData.title ?? "",
          notes: initialData.notes ?? "",
          veterinarian: initialData.veterinarian ?? "",
          hospital: initialData.hospital ?? "",
          medication: initialData.medication ?? "",
          dosage: initialData.dosage ?? "",
          frequency: initialData.frequency ?? "",
          due_date: initialData.due_date
            ? new Date(initialData.due_date)
            : null,
          weight: initialData.weight ?? "",
          unit: initialData.unit ?? null,
          symptoms: initialData.symptoms ?? "",
          treatment: initialData.treatment ?? "",
          reminder_date: initialData.reminder_date
            ? new Date(initialData.reminder_date)
            : null,
          reminder_time: initialData.reminder_time ?? "",
        }
      : emptyDefaultValues;
  }, [initialData, mode]);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    register,
  } = useForm({ defaultValues: emptyDefaultValues });
  const { user } = useUser();
  const { selectedPet } = useSelectedPet();
  const addHealthlog = useAddHealthlogs();
  const updateHealthlog = useUpdateHealthlogs();
  const selectedLogType = watch("log_type");
  const modalRef = useRef();
  const onCloseAndReset = useCallback(() => {
    reset(emptyDefaultValues);
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseAndReset();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseAndReset]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseAndReset();
      }
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCloseAndReset]);

  useEffect(() => {
    if (isOpen) {
      reset(currentDefaultValues);
    } else {
      reset(emptyDefaultValues);
    }
  }, [isOpen, reset, currentDefaultValues]);
  useEffect(() => {
    if (isOpen) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const setRealHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setRealHeight();
    window.addEventListener("resize", setRealHeight);

    return () => {
      window.removeEventListener("resize", setRealHeight);
    };
  }, []);

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
    const healthlogData = {
      ...data,
      due_date: data.due_date ? format(data.due_date, "yyyy-MM-dd") : null,
      pet_id: selectedPet?.id,
      reminder_at:
        data.reminder_date && data.reminder_time
          ? new Date(`${dateStr}T${hrs}`).toISOString()
          : null,
      user_id: user?.id,
    };
    if (mode === "edit" && initialData) {
      updateHealthlog.mutate(
        { id: initialData.id, updates: healthlogData },
        {
          onSuccess: () => {
            reset(emptyDefaultValues);
            onClose();
          },
        }
      );
    } else {
      addHealthlog.mutate(healthlogData, {
        onSuccess: () => {
          reset(emptyDefaultValues);
          onClose();
        },
      });
    }
  }
  const logTypeOptions = [
    { value: "vetvisit", label: "Vet Visit" },
    { value: "vaccination", label: "Vaccination" },
    { value: "medication", label: "Medication" },
    { value: "illnesssymptoms", label: "Illness/Symptoms" },
    { value: "weightcheck", label: "Weight Check" },
    { value: "other", label: "Other" },
  ];

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
    <RemoveScroll enabled={isOpen}>
      <Overlay>
        <ModalContainer ref={modalRef}>
          <HeaderContainer>
            <HeaderContainer1>
              <HeaderTitleContainer>
                <Title>
                  {mode === "add" ? "Add New Health Log" : "Edit Health Log"}
                </Title>
              </HeaderTitleContainer>
            </HeaderContainer1>
            <HeaderContainer2>
              <CloseButton onClick={onCloseAndReset}>
                <X size={20} color="red" />
              </CloseButton>
            </HeaderContainer2>
          </HeaderContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <PetLogTypeContainer>
              <LogTypeContainer>
                <Label>Log Type</Label>
                <Controller
                  control={control}
                  name="log_type"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      options={logTypeOptions}
                      value={logTypeOptions.find(
                        (opt) => opt.value === field.value
                      )}
                      onChange={(opt) => field.onChange(opt ? opt.value : null)}
                      placeholder="Select type"
                      isSearchable={false}
                      styles={customStyle}
                    />
                  )}
                />
                {errors.log_type && <Error>This field is required</Error>}
              </LogTypeContainer>
              <TitleContainer>
                <Label>Title</Label>
                <Input
                  placeholder="Enter a descriptive title"
                  {...register("title", { required: true })}
                />
                {errors.title && <Error>This field is required</Error>}
              </TitleContainer>
            </PetLogTypeContainer>
            {selectedLogType === "vetvisit" && (
              <>
                <VetHospitalContainer>
                  <VetContainer>
                    <Label>Veterinarian</Label>
                    <Input
                      placeholder="Dr.Smith"
                      {...register("veterinarian", { required: true })}
                    />
                    {errors.veterinarian && (
                      <Error>This field is required</Error>
                    )}
                  </VetContainer>
                  <HospitalContainer>
                    <Label>Clinic/Hospital</Label>
                    <Input
                      placeholder="Happy Paws Veterinary Clinic"
                      {...register("hospital", { required: true })}
                    />
                    {errors.hospital && <Error>This field is required</Error>}
                  </HospitalContainer>
                </VetHospitalContainer>
                <NextDueDateContainer>
                  <Label>Next Due Date</Label>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <DateInput
                        selectedDate={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </NextDueDateContainer>
              </>
            )}
            {selectedLogType === "vaccination" && (
              <>
                <VetHospitalContainer>
                  <VetContainer>
                    <Label>Veterinarian</Label>
                    <Input
                      placeholder="Dr.Smith"
                      {...register("veterinarian", { required: true })}
                    />
                    {errors.veterinarian && (
                      <Error>This field is required</Error>
                    )}
                  </VetContainer>
                  <HospitalContainer>
                    <Label>Clinic/Hospital</Label>
                    <Input
                      placeholder="Happy Paws Veterinary Clinic"
                      {...register("hospital", { required: true })}
                    />
                    {errors.hospital && <Error>This field is required</Error>}
                  </HospitalContainer>
                </VetHospitalContainer>
                <NextDueDateContainer>
                  <Label>Next Due Date</Label>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <DateInput
                        selectedDate={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </NextDueDateContainer>
              </>
            )}
            {selectedLogType === "medication" && (
              <>
                <MedicationDosageContainer>
                  <MedicationContainer>
                    <Label>Medication Name</Label>
                    <Input
                      placeholder="Heartgard Plus"
                      {...register("medication", { required: true })}
                    />
                    {errors.medication && <Error>This field is required</Error>}
                  </MedicationContainer>
                  <DosageContainer>
                    <Label>Dosage</Label>
                    <Input
                      placeholder="1 tablet"
                      {...register("dosage", { required: true })}
                    />
                    {errors.dosage && <Error>This field is required</Error>}
                  </DosageContainer>
                </MedicationDosageContainer>
                <FrequencyContainer>
                  <Label>Frequency</Label>
                  <Input
                    placeholder="Once daily"
                    {...register("frequency", { required: true })}
                  />
                  {errors.frequency && <Error>This field is required</Error>}
                </FrequencyContainer>
                <NextDueDateContainer>
                  <Label>Next Due Date</Label>
                  <Controller
                    name="due_date"
                    control={control}
                    render={({ field }) => (
                      <DateInput
                        selectedDate={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
                </NextDueDateContainer>
              </>
            )}
            {selectedLogType === "weightcheck" && (
              <WeightUnitContainer>
                <WeightContainer>
                  <Label>Weight</Label>
                  <Input
                    placeholder="28.5"
                    {...register("weight", { required: true })}
                  />
                  {errors.weight && <Error>This field is required</Error>}
                </WeightContainer>
                <UnitContainer>
                  <Label>Unit</Label>
                  <Controller
                    control={control}
                    name="unit"
                    rules={{ required: true }}
                    render={({ field }) => {
                      const unitTypeOptions = [
                        { value: "kilograms", label: "Kilograms(kg)" },
                        { value: "pounds", label: "Pounds (lbs)" },
                      ];
                      const selectUnitTypeOption = unitTypeOptions.find(
                        (opt) => opt.value === field.value
                      );
                      return (
                        <Select
                          {...field}
                          options={unitTypeOptions}
                          value={selectUnitTypeOption}
                          onChange={(selectUnitTypeOption) =>
                            field.onChange(
                              selectUnitTypeOption
                                ? selectUnitTypeOption.value
                                : null
                            )
                          }
                          isSearchable={false}
                          placeholder="Select unit"
                          styles={customStyle}
                        />
                      );
                    }}
                  />
                  {errors.unit && <Error>This field is required</Error>}
                </UnitContainer>
              </WeightUnitContainer>
            )}
            {selectedLogType === "illnesssymptoms" && (
              <>
                <SymptomsContainer>
                  <Label>Symptoms</Label>
                  <Input
                    placeholder="Vomiting, loss of appetite"
                    {...register("symptoms", { required: true })}
                  />
                  {errors.symptoms && <Error>This field is required</Error>}
                </SymptomsContainer>
                <TreatmentContainer>
                  <Label>Treatment</Label>
                  <Input
                    placeholder="Fasting for 12 hours, bland diet"
                    {...register("treatment", { required: true })}
                  />
                  {errors.treatment && <Error>This field is required</Error>}
                </TreatmentContainer>
              </>
            )}
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
            <NotesContainer>
              <Label>Notes</Label>
              <NotesInput
                placeholder="Add detailed notes about this health log entry..."
                {...register("notes", { required: true })}
              />
              {errors.notes && <Error>This field is required</Error>}
            </NotesContainer>

            <Buttons>
              <ButtonContainer1></ButtonContainer1>
              <ButtonContainer2>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>
                <SaveButton
                  type="submit"
                  disabled={addHealthlog.isPending || updateHealthlog.isPending}
                >
                  {addHealthlog.isPending || updateHealthlog.isPending ? (
                    <SpinnerMini width="1.6rem" height="1.6rem" color="white" />
                  ) : mode === "add" ? (
                    "Add"
                  ) : (
                    "Update"
                  )}
                </SaveButton>
              </ButtonContainer2>
            </Buttons>
          </Form>
        </ModalContainer>
      </Overlay>
    </RemoveScroll>
  );
}
const Overlay = styled.div`
  transition: fadeIn 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  position: fixed;
  top: 0;
  inset: 0;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 650px;
  height: 530px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding: 1.5rem;
  padding-bottom: 1.7rem;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  @media (max-width: 1024px) {
    height: 520px;
  }
  @media (max-width: 767px) {
    padding: 1.2rem;
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
const Title = styled.h2`
  color: #ed4a2f;
  font-family: "MyFont";
  font-weight: 500;
`;
const Label = styled.label`
  margin-top: 1rem;
`;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;
const Form = styled.form``;
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
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
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

const PetLogTypeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: -10px;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
`;
const LogTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  width: 50%;
`;
const DateTimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  height: 130px;
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
const NotesInput = styled.textarea`
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

const VetHospitalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const VetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const HospitalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const ButtonContainer1 = styled.div``;
const ButtonContainer2 = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const NextDueDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const MedicationDosageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const MedicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const DosageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const FrequencyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const WeightUnitContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const WeightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const UnitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 0.3rem;
`;
const SymptomsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const TreatmentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export default HealthlogsModal;
