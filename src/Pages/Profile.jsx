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
  @media (max-width: 767px) {
  }
`;
export default Profile;
