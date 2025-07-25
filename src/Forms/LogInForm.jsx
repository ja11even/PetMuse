import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLogIn } from "../Hooks/useLogIn";
import LogInVerticalForm from "./LogInVerticalForm";
import { Link } from "react-router-dom";
import SpinnerMini from "../Components/SpinnerMini";

function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logIn = useLogIn();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) return;
    logIn.mutate({ email, password });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <LogInVerticalForm label="Email">
        <Input
          ref={inputRef}
          type="email"
          id="email"
          disabled={logIn.isPending}
          value={email}
          autoComplete="username"
          onChange={(e) => setEmail(e.target.value)}
        />
      </LogInVerticalForm>
      <LogInVerticalForm
        label="Password"
        extraLabel={
          <ForgotPassword to="/forgot-password">
            Forgot password?
          </ForgotPassword>
        }
      >
        <InputWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            disabled={logIn.isPending}
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
      </LogInVerticalForm>
      <Button disabled={logIn.isPending} type="submit">
        {logIn.isPending ? (
          <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
        ) : (
          "Log In"
        )}
      </Button>
      <Divider>
        <DividerText>OR CONTINUE WITH</DividerText>
      </Divider>
    </Form>
  );
}
const Form = styled.form`
  width: 100%;
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
  color: #9ca3af;
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
  background-color: #ed4a2f;
  font-family: inherit;
  font-weight: 400;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
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

const ForgotPassword = styled(Link)`
  color: #ed4a2f;
  font-size: 0.9rem;
  text-decoration: none;
`;
export default LogInForm;
