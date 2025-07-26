import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import MyPetsMainLayout from "../Components/MyPetsMainLayout";

function MyPets() {
  return (
    <MyPetsContainer>
      <Sidebar />
      <MyPetsMainLayout />
    </MyPetsContainer>
  );
}

const MyPetsContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
  }
`;
export default MyPets;
