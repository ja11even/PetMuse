import styled from "styled-components";

function LogInVerticalForm({ label, error, children, extraLabel }) {
  return (
    <StyledRow>
      <LabelContainer>
        {label && <Label htmlFor="">{label}</Label>}
        {extraLabel && extraLabel}
      </LabelContainer>
      {children}
      {error && <Error>{error}</Error>}
    </StyledRow>
  );
}
const StyledRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;
const Label = styled.label`
  font-size: 1rem;
  color: black;
`;
const Error = styled.span`
  font-size: 0.9rem;
  color: red;
`;
const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export default LogInVerticalForm;
