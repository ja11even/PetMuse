import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import AppointmentMainLayout from "../Components/AppointmentMainLayout";

function Appointment() {
  return (
    <AppointmentContainer>
      <Sidebar />
      <AppointmentMainLayout />
    </AppointmentContainer>
  );
}
const AppointmentContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
  }
`;
export default Appointment;
