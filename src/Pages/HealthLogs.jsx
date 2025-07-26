import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import HealthLogsMainLayout from "../Components/HealthLogsMainLayout";
function HealthLogs() {
  return (
    <HealthLogsContainer>
      <Sidebar />
      <HealthLogsMainLayout />
    </HealthLogsContainer>
  );
}

const HealthLogsContainer = styled.div`
  display: flex;
  height: 100dvh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
  }
`;
export default HealthLogs;
