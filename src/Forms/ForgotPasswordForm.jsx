import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { supabase } from "../Services/Supabase";
import toast from "react-hot-toast";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent");
    }
    setSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <EmailDiv>
        <Label>Email address</Label>
        <Input
          ref={inputRef}
          type="email"
          id="email"
          placeholder="name@example.com"
          value={email}
          disabled={submitting}
          onChange={(e) => setEmail(e.target.value)}
        />
      </EmailDiv>
      <Button type="submit" disabled={submitting}>
        Send reset link
      </Button>
    </Form>
  );
}
const Form = styled.form`
  width: 100%;
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
const EmailDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
export default ForgotPasswordForm;
