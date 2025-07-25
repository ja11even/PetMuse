import { Send, SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { supabase } from "../Services/Supabase";
import toast from "react-hot-toast";
import { useState } from "react";
import SpinnerMini from "../Components/SpinnerMini";

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const contactData = {
      ...data,
    };
    setLoading(true);
    const { error } = await supabase
      .from("Contact")
      .insert([contactData])
      .select();
    if (error) {
      toast.error("Failed to send. Try again.");
    } else {
      toast.success("Message Sent!");
      reset();
    }
    setLoading(false);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <EmailContainer>
        <Label>Email</Label>
        <Input
          placeholder="Enter your email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <Error>This field is required</Error>}
      </EmailContainer>
      <MessageContainer>
        <Label>Message</Label>
        <MessageInput
          placeholder="Provide details about your inquiry"
          {...register("message", { required: true })}
        />
        {errors.message && <Error>This field is required</Error>}
      </MessageContainer>
      <Button type="submit">
        {loading ? (
          <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
        ) : (
          <>
            Send message <SendHorizontal size={20} />
          </>
        )}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
`;
const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label`
  margin-top: 1rem;
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
  &::placeholder {
    font-family: inherit;
  }
`;
const MessageInput = styled.textarea`
  border: none;
  background-color: transparent;
  height: 100px;
  resize: none;
  width: 100%;
  border: 1px solid #ed4a2f;
  font-size: 1rem;
  border-radius: 5px;
  font-family: inherit;
  padding: 0.7rem 1rem;
  caret-color: #ed4a2f;
  line-height: 1.4;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: inherit;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
const Error = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.1rem;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 0;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  gap: 0.7rem;
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
export default ContactForm;
