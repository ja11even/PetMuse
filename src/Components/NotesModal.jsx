import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAddNotes, useUpdateNotes } from "../Hooks/useNotes";
import { useUser } from "../Hooks/useUser";
import { useCallback, useEffect, useMemo, useRef } from "react";
import SpinnerMini from "./SpinnerMini";
import { useSelectedPet } from "./useSelectedPet";
import { RemoveScroll } from "react-remove-scroll";
const emptyDefaultValues = {
  title: "",
  notes: "",
};

function NotesModal({ isOpen, onClose, mode, initialData }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyDefaultValues,
  });
  const { user } = useUser();
  const { selectedPet } = useSelectedPet();
  const addNotes = useAddNotes();
  const updateNotes = useUpdateNotes();
  const modalRef = useRef();
  const currentDefaultValues = useMemo(() => {
    return mode === "edit" && initialData
      ? {
          title: initialData.title ?? "",
          notes: initialData.notes ?? "",
        }
      : emptyDefaultValues;
  }, [initialData, mode]);

  const onCloseAndReset = useCallback(() => {
    onClose();
    reset(emptyDefaultValues);
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

  function onSubmit(data) {
    const notesData = {
      ...data,
      user_id: user?.id,
      pet_id: selectedPet?.id,
    };
    if (mode === "edit" && initialData) {
      updateNotes.mutate(
        { id: initialData.id, updates: notesData },
        { onSuccess: onCloseAndReset }
      );
    } else {
      addNotes.mutate(notesData, { onSuccess: onCloseAndReset });
    }
  }

  if (!isOpen) return null;
  return (
    <RemoveScroll enabled={isOpen}>
      <Overlay>
        <ModalContainer ref={modalRef}>
          <FirstContainer>
            <First1>New Note</First1>
            <CloseButton onClick={onCloseAndReset}>
              <X size={20} color="red" />
            </CloseButton>
          </FirstContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputDiv>
              <Input
                placeholder="Note title..."
                {...register("title", { required: true })}
              />
              {errors.title && <Error>This field is required</Error>}
            </InputDiv>

            <NotesArea
              placeholder="Write your notes here..."
              {...register("notes", { required: true })}
            />
            <Buttons>
              <ButtonContainer1></ButtonContainer1>
              <ButtonContainer2>
                <CancelButton
                  type="button"
                  onClick={onCloseAndReset}
                  disabled={addNotes.isPending || updateNotes.isPending}
                >
                  Cancel
                </CancelButton>
                <SaveButton
                  type="submit"
                  disabled={addNotes.isPending || updateNotes.isPending}
                >
                  {addNotes.isPending || updateNotes.isPending ? (
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
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
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
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.7rem;
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  @media (max-width: 767px) {
    padding: 1.2rem;
    max-width: 95%;
    max-height: 95vh;
  }
`;
const Form = styled.form`
  padding: 1.5rem;
  padding-top: 0.5rem;
  @media (max-width: 767px) {
    padding: 1.2rem;
  }
`;
const Input = styled.input`
  width: 100%;
  height: 45px;
  padding: 0.6rem;
  border: none;
  border-bottom: 1px solid #ed4a2f;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: inherit;
  }
`;
const NotesArea = styled.textarea`
  width: 100%;
  min-height: 210px;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid red;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  line-height: 1.4;
  margin-top: 23px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &:focus {
    outline: none;
  }
`;
const FirstContainer = styled.div`
  background-color: #fffaf4;
  padding: 1.5rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  @media (max-width: 767px) {
    padding: 1.2rem;
  }
`;
const First1 = styled.div`
  color: #ed4a2f;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 0.5rem;
`;
const Buttons = styled.div`
  margin-top: 1.5rem;
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
const ButtonContainer1 = styled.div``;
const ButtonContainer2 = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const InputDiv = styled.div`
  width: 100%;
`;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.1rem;
`;
export default NotesModal;
