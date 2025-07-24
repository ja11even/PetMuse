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
  overflow: hidden;
  @media (max-width: 767px) {
    flex-direction: row;
    overflow-x: hidden;
  }
`;
export default HealthLogs;
