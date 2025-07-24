import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { useUser } from "../Hooks/useUser";
import { supabase } from "../Services/Supabase";
import { Camera, X } from "lucide-react";
import { useAddPets, useFetchPets } from "../Hooks/usePets";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
const emptyDefaultValues = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  color: "",
  weight: "",
  unit: null,
};
function AddPetModal({ isOpen, onClose, mode, initialPetData }) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { user, isLoadingUser } = useUser();
  const { pets, isLoadingPets } = useFetchPets();
  const addPets = useAddPets();
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm({ defaultValues: emptyDefaultValues });
  const modalRef = useRef(null);
  const onCloseAndReset = useCallback(() => {
    reset(emptyDefaultValues);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  }, [reset, onClose, previewUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseAndReset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseAndReset]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onCloseAndReset();
    }
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCloseAndReset]);
  useEffect(() => {
    if (!isOpen) return;
    if (mode === "edit" && initialPetData) {
      setValue("name", initialPetData.name);
      setValue("species", initialPetData.species);
      setValue("breed", initialPetData.breed);
      setValue("gender", initialPetData.gender);
      setValue("color", initialPetData.color);
      setValue("age", initialPetData.age);
      setValue("weight", initialPetData.weight);
      setValue("unit", initialPetData.unit);
    } else if (mode === "add") {
      reset();
    }
  }, [isOpen, mode, initialPetData, reset, setValue]);

  if (isLoadingUser) return <p>loading..</p>;
  if (isLoadingPets) return <p>loading..</p>;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };
  async function onSubmit(data) {
    setUploading(true);
    try {
      let avatar_url = null;
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `${user.id}-${uuidv4()}.${fileExt}`;
        const filePath = `pet-avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("pet-avatars")
          .upload(filePath, selectedFile);
        if (uploadError) throw uploadError;
        const {
          data: { publicUrl },
        } = supabase.storage.from("pet-avatars").getPublicUrl(filePath);

        avatar_url = `${publicUrl}?${Date.now()}`;
      }
      const petData = {
        ...data,
        user_id: user.id,
        avatar_url,
      };

      await addPets.mutateAsync(petData, { onSuccess: onCloseAndReset });
    } catch (err) {
      console.log(err.message);
    } finally {
      setUploading(false);
      reset(emptyDefaultValues);
      setSelectedFile(null);
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
    <Overlay>
      <ModalContainer ref={modalRef}>
        <HeaderContainer>
          <HeaderCont1>
            <Title>
              {pets.length < 1
                ? "Add your first Pet"
                : mode === "add"
                ? "Add Pet"
                : "Edit Pet"}
            </Title>
          </HeaderCont1>
          <HeaderCont2>
            <CloseButton onClick={onCloseAndReset}>
              <X size={20} color="red" />
            </CloseButton>
          </HeaderCont2>
        </HeaderContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PetContainer>
            <Label>Pet Name</Label>
            <Input
              type="text"
              placeholder="e.g. Bella"
              {...register("name", { required: true })}
            />
            {errors.name && <Error>This field is required</Error>}
          </PetContainer>
          <SpeciesContainer>
            <Label>Species</Label>
            <Input
              type="text"
              placeholder="e.g. Dog"
              {...register("species", { required: true })}
            />
            {errors.species && <Error>This field is required</Error>}
          </SpeciesContainer>
          <BreedContainer>
            <Label>Breed</Label>
            <Input
              type="text"
              placeholder="e.g. Bulldog"
              {...register("breed", { required: true })}
            />
            {errors.breed && <Error>This field is required</Error>}
          </BreedContainer>
          <AgeContainer>
            <Label>Age</Label>
            <Input
              type="number"
              placeholder="e.g. 2"
              {...register("age", {
                min: { value: 0, message: "Age must be positive" },
              })}
            />
            {errors.age && <Error>{errors.age.message}</Error>}
          </AgeContainer>
          <GenderContainer>
            <Label>Gender</Label>
            <Input
              type="text"
              placeholder="e.g. Female"
              {...register("gender", { required: true })}
            />
            {errors.gender && <Error>This field is required</Error>}
          </GenderContainer>
          <ColorContainer>
            <Label>Color</Label>
            <Input
              type="text"
              placeholder="e.g. Brown"
              {...register("color", { required: true })}
            />
            {errors.color && <Error>This field is required</Error>}
          </ColorContainer>
          <WeightUnitContainer>
            <WeightContainer>
              <Label>Weight</Label>
              <Input
                placeholder="e.g. 28.5"
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
          <PetAvatarContainer>
            <Label>Pet Avatar</Label>
            <HiddenInput
              id="petavatar"
              onChange={handleFileChange}
              type="file"
              accept="image/*"
            />
            <LabelAvatar>
              {previewUrl && <PreviewImg src={previewUrl} alt="petavatar" />}
              <AvatarLabel htmlFor="petavatar">
                <Camera size={20} />
                Upload pet avatar
              </AvatarLabel>
            </LabelAvatar>
          </PetAvatarContainer>
          <Buttons>
            <CancelBtn type="button" onClick={onCloseAndReset}>
              Cancel
            </CancelBtn>
            <SaveBtn type="submit" disabled={mode === "add" ? !isValid : ""}>
              {mode === "add" ? "Save Pet" : "Update Pet"}
            </SaveBtn>
          </Buttons>
        </Form>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  animation: fadeIn 0.3s ease-in-out;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
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
  max-width: 90%;
  width: 650px;
  height: 480px;
  background-color: white;
  padding: 1.5rem;
  padding-bottom: 1.7rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: scroll;
  touch-action: none;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  @media (max-width: 767px) {
    padding: 1.2rem;
  }
`;
const Error = styled.p`
  font-size: 0.8rem;
  color: red;
  margin-top: -0.5rem;
`;
const Title = styled.h2`
  color: #ed4a2f;
  margin-bottom: 1.5rem;
`;
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeaderCont1 = styled.div``;
const HeaderCont2 = styled.div``;
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
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Label = styled.label``;
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
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 2rem;
`;
const CancelBtn = styled.button`
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
const SaveBtn = styled.button`
  background: ${({ disabled }) => (disabled ? "#ed4a2f1a" : "#ed4a2f")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  padding: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  border: none;
  color: #ffffff;
  border-radius: 5px;
  font-size: 1rem;
  width: 120px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
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
const HiddenInput = styled.input`
  display: none;
`;
const AvatarLabel = styled.label`
  height: fit-content;
  font-family: inherit;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  gap: 0.5rem;
  border-radius: 5px;
  padding: 0.8rem;
  height: 45px;
  background-color: #ed4a2f;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
const PetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: -10px;
`;
const SpeciesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const BreedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const AgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const PetAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const PreviewImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;
const LabelAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
export default AddPetModal;
