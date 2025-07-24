import { ChevronRight, Router } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { supabase } from "../Services/Supabase";
import { useNavigate } from "react-router-dom";

function WelcomeForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const onSubmit = async (data) => {
    const { firstName, lastName } = data;
    const { error } = await supabase.auth.updateUser({
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    if (error) {
      console.log(error.message);
      return;
    }
    navigate("/dashboard");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FirstNameContainer>
        <Label>First name</Label>
        <Input
          ref={inputRef}
          placeholder="First name"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <Error>This field is required</Error>}
      </FirstNameContainer>
      <LastNameContainer>
        <Label>Last name</Label>
        <Input
          placeholder="Last name"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <Error>This field is required</Error>}
      </LastNameContainer>
      <Button type="submit">
        Go to dashboard
        <ChevronRight size={20} />
      </Button>
    </Form>
  );
}
const Form = styled.form`
  width: 100%;
`;
const FirstNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const LastNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label``;
const Input = styled.input`
  border: none;
  background-color: transparent;
  height: 45px;
  width: 100%;
  border: 1px solid #ed4a2f;
  font-size: 1rem;
  border-radius: 5px;
  font-family: inherit;
  padding: 0 1rem;
  caret-color: #ed4a2f;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: inherit;
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 0;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  gap: 0.4rem;
  font-size: 1rem;
  width: 100%;
  height: 45px;
  color: white;
  font-family: inherit;
  background: #ed4a2f;
  &:hover {
    cursor: pointer;
  }
`;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.1rem;
`;
export default WelcomeForm;
