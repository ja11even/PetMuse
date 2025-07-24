import styled from "styled-components";

function SignUpVerticalRow({ label, children, error }) {
  return (
    <StyledForm>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledForm>
  );
}

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem 0;
  flex: 1;
`;
const Error = styled.span`
  color: red;
  font-size: 0.9rem;
`;
const Label = styled.label`
  font-size: 1rem;
  color: black;
`;
export default SignUpVerticalRow;
