import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import ProfileMainLayout from "../Components/ProfileMainLayout";

function Profile() {
  return (
    <HealthLogsContainer>
      <Sidebar />
      <ProfileMainLayout />
    </HealthLogsContainer>
  );
}

const HealthLogsContainer = styled.div`
  display: flex;
  height: 100dvh;
  background-color: #ffffff;
  overflow: hidden;
  @media (max-width: 767px) {
    overflow-x: hidden;
    flex-direction: row;
  }
`;
export default Profile;
