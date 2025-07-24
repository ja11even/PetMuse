import styled from "styled-components";
import { ChevronLeft } from "lucide-react";
import { Heading } from "../Components/Heading";
import Sidebar from "../Components/Sidebar";
import LogDetailMainLayout from "../Components/LogDetailMainLayout";

function LogDetailPage() {
  return (
    <LogDetailContainer>
      <Sidebar />
      <LogDetailMainLayout />
    </LogDetailContainer>
  );
}
const LogDetailContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
    overflow-x: hidden;
  }
`;
export default LogDetailPage;
