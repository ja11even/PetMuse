import styled from "styled-components";
import NotesMainLayout from "../Components/NotesMainLayout";
import Sidebar from "../Components/Sidebar";

function Notes() {
  return (
    <NotesContainer>
      <Sidebar />
      <NotesMainLayout />
    </NotesContainer>
  );
}
const NotesContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
`;
export default Notes;
