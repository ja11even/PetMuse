import { Calendar, ChevronLeft, PawPrint } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { supabase } from "../Services/Supabase";
import { format } from "date-fns";
import { Heading } from "./Heading";
import Loader from "./Loader";

function NoteDetailMainLayout() {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNote() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Notes")
        .select("*")
        .eq("id", noteId)
        .single();
      if (!error) setNote(data);
      setLoading(false);
    }
    fetchNote();
  }, [noteId]);
  if (loading) return <Loader />;
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <HeaderContainer>
        <Heading as="h5">Note Details</Heading>
        <HeaderText>View the full details of this note entry</HeaderText>
      </HeaderContainer>
      <FirstContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          View Notes
        </BackButton>
      </FirstContainer>
      <SecondContainer>
        <Card>
          <OrangeDiv></OrangeDiv>
          <CardInfo>
            <CardDetails>
              <CardTitle>{note?.title}</CardTitle>
              <CardDate>
                <Calendar size={17} />
                {note?.created_at &&
                  format(note?.created_at, "EEE, MMMM d, yyyy")}
              </CardDate>
              <CardNotes>{note?.notes}</CardNotes>
            </CardDetails>
          </CardInfo>
        </Card>
      </SecondContainer>
    </MainLayoutContainer>
  );
}

const MainLayoutContainer = styled.div`
  flex: 4;
  overflow-y: auto;
  background-color: #fce9d0;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
  position: relative;
  transition: transform 0.3s ease;
  @media (max-width: 1024px) {
    width: 100%;
    transform: ${({ openSidebar }) =>
      openSidebar ? "translateX(75%)" : "translateX(0)"};
    padding: 2rem 1rem;
  }
  @media (max-width: 767px) {
    width: 100%;
    transform: ${({ openSidebar }) =>
      openSidebar ? "translateX(75%)" : "translateX(0)"};
    padding: 2rem 1rem;
  }
`;
const SidebarIcon = styled.div`
  height: 27px;
  margin-bottom: 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  @media (max-width: 1024px) {
    display: block;
  }
  @media (max-width: 767px) {
    display: block;
  }
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4;
`;
const HeaderText = styled.p`
  font-size: 1.1rem;
  @media (max-width: 767px) {
    font-size: 1.05rem;
  }
`;
const FirstContainer = styled.div`
  margin-top: 35px;
`;
const BackButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  font-size: 1rem;
  margin-top: 20px;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  font-family: inherit;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const SecondContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;
const Card = styled.div`
  background-color: white;
  display: flex;
  margin-top: 15px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: auto;
  overflow: visible;
  position: relative;
`;

const OrangeDiv = styled.div`
  background-color: #ed4a2f;
  height: auto;
  width: 3px;
  @media (max-width: 1024px) {
    display: block;
    border: 1px solid #ed4a2f;
  }
  @media (max-width: 767px) {
    display: block;
    border: 1px solid #ed4a2f;
  }
`;
const CardTitle = styled.p`
  font-size: 1.2rem;
  color: #ed4a2f;
  word-break: break-all;
`;
const CardDate = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.3rem;
`;
const CardInfo = styled.div`
  display: flex;
  padding: 1.5rem;
  width: 100%;
  justify-content: space-between;
  height: auto;
  overflow: visible;
  position: relative;
`;
const CardNotes = styled.p`
  margin-top: 10px;
  word-break: break-all;
`;
const CardDetails = styled.div`
  width: 990px;
`;
export default NoteDetailMainLayout;
