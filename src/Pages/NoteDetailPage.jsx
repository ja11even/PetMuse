import styled from "styled-components";
import Sidebar from "../Components/Sidebar";
import NoteDetailMainLayout from "../Components/NoteDetailMainLayout";

function NoteDetailPage() {
  return (
    <NoteDetailContainer>
      <Sidebar />
      <NoteDetailMainLayout />
    </NoteDetailContainer>
  );
}
const NoteDetailContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #ffffff;
  @media (max-width: 767px) {
    flex-direction: row;
    overflow-x: hidden;
  }
`;
export default NoteDetailPage;
