import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import DashboardMainLayout from "../Components/DashboardMainLayout";
import FullPageLoader from "../Components/FullPageLoader";

function Dashboard() {
  return (
    <>
      <DashboardContainer>
        <Sidebar />
        <DashboardMainLayout />
      </DashboardContainer>
    </>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
  }
`;
export default Dashboard;
