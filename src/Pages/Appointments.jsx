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
  height: 100dvh;
  background-color: #ffffff;
  overflow: hidden;
  @media (max-width: 767px) {
    flex-direction: row;
    overflow-x: hidden;
  }
`;
export default Appointment;
