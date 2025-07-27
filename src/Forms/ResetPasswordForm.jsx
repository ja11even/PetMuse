import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../Services/Supabase";
import SpinnerMini from "../Components/SpinnerMini";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      supabase.auth.setSessionFromUrl({ hash }).catch(() => {
        toast.error("Expired reset link");
        navigate("/forgotpassword");
      });
    }
  }, [navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.success("Fill in both fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.success("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(password)) {
      toast.success("Password requirements not met");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password: password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      navigate("/login");
    }
    setSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <PassWordContainer>
        <Label>New password</Label>
        <InputWrapper>
          <Input
            ref={inputRef}
            value={password}
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
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
      </PassWordContainer>
      <PassWordContainer2>
        <Label>Confirm password</Label>
        <InputWrapper>
          <Input
            id="confirmpassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            placeholder="Confirm your new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <VisibilityButton
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <StyledEye size={17} />
            ) : (
              <StyledEyeOff size={17} />
            )}
          </VisibilityButton>
        </InputWrapper>
      </PassWordContainer2>
      <StyledText>
        Password must be at least 8 characters and include a number and a
        special character.
      </StyledText>
      <Button type="submit">
        {submitting ? (
          <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
        ) : (
          "Set new password"
        )}
      </Button>
    </Form>
  );
}
const Form = styled.form`
  width: 100%;
`;
const PassWordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const PassWordContainer2 = styled.div`
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
const StyledText = styled.p`
  color: black;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  @media (max-width: 767px) {
    font-size: 0.82rem;
  }
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
  font-weight: 400;
  background: #ed4a2f;
  &:hover {
    cursor: pointer;
  }
`;
export default ResetPasswordForm;
