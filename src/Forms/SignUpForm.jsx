import styled from "styled-components";
import SignUpVerticalRow from "./SignUpVerticalRow";
import { useSignUp } from "../Hooks/usesignUp";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import SpinnerMini from "../Components/SpinnerMini";

function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUp();
  const { formState, register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const { errors } = formState;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  function Submit({ email, firstName, lastName, password }) {
    signUp.mutate(
      { email, firstName, lastName, password },
      { onSuccess: () => reset() }
    );
  }

  return (
    <Form onSubmit={handleSubmit(Submit)}>
      <FullNameDiv>
        <SignUpVerticalRow
          label="First name"
          error={errors?.firstName?.message}
        >
          <Input
            ref={inputRef}
            type="text"
            id="firstName"
            placeholder="First name"
            disabled={signUp.isPending}
            {...register("firstName", { required: "First  name is required " })}
          />
        </SignUpVerticalRow>
        <SignUpVerticalRow label="Last name" error={errors?.lastName?.message}>
          <Input
            type="text"
            id="lastName"
            placeholder="Last name"
            disabled={signUp.isPending}
            {...register("lastName", { required: "Last name is required" })}
          />
        </SignUpVerticalRow>
      </FullNameDiv>
      <SignUpVerticalRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          placeholder="you@example.com"
          disabled={signUp.isPending}
          {...register(
            "email",
            { required: "Email address is required" },
            {
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email ",
              },
            }
          )}
        />
      </SignUpVerticalRow>
      <SignUpVerticalRow label="Password" error={errors?.password?.message}>
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Create a strong password"
            disabled={signUp.isPending}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "At least 8 characters",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])(?=.*\d).+$/,
                message: "Must include a number and special character",
              },
            })}
          />
          <VisibilityButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <StyledEye size={17} />
            ) : (
              <StyledEyeOff size={17} />
            )}
          </VisibilityButton>
        </InputWrapper>
      </SignUpVerticalRow>
      <StyledText>
        Password must be at least 8 characters and include a number and a
        special character.
      </StyledText>
      <CheckboxWrapper>
        <Checkbox
          type="checkbox"
          id="check"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <CheckboxLabel htmlFor="check">
          I agree to the<StyledLink to="/terms"> Terms</StyledLink> and
          <StyledLink to="/privacy"> Privacy Policy</StyledLink>
        </CheckboxLabel>
      </CheckboxWrapper>
      <Button disabled={!checked} type="submit">
        {isPending ? (
          <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
        ) : (
          "Create account"
        )}
      </Button>
      <Divider>
        <DividerText>OR SIGN UP WITH</DividerText>
      </Divider>
    </Form>
  );
}

const FullNameDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;

const DividerText = styled.p`
  font-size: 0.8rem;
  color: #ed4a2f;
`;
const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  color: #ed4a2f;
  margin: 2rem 0;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ed4a2f;
  }
  &::before {
    margin-right: 0.75em;
  }
  &::after {
    margin-left: 0.75em;
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
  background: ${({ disabled }) => (disabled ? "#ed4a2f1a" : "#ed4a2f")};
  &:hover {
    cursor: pointer;
  }
`;
const Checkbox = styled.input`
  height: 15px;
  width: 15px;
  border: none;
  accent-color: #ed4a2f;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #ed4a2f;
  &:hover {
    cursor: pointer;
  }
`;
const CheckboxWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const CheckboxLabel = styled.label`
  color: black;
  font-size: 1rem;
  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;
const StyledText = styled.p`
  color: black;
  font-size: 0.9rem;
  @media (max-width: 767px) {
    font-size: 0.82rem;
  }
`;
const Form = styled.form`
  width: 100%;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  height: 45px;
  width: 100%;
  color: black;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ed4a2f;
  padding: 0 1rem;
  caret-color: #ed4a2f;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: inherit;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledEye = styled(Eye)`
  position: absolute;
`;
const StyledEyeOff = styled(EyeOff)`
  position: absolute;
`;
const VisibilityButton = styled.button`
  height: 45px;
  width: 45px;
  right: 0;
  border-radius: 5px;
  position: absolute;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #ed4a2f;
  &:hover {
    background-color: #ed4a2f;
    color: white;
    cursor: pointer;
  }
`;
export default SignUpForm;
