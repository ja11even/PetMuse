import styled from "styled-components";
import { Heading } from "./Heading";
import CalendarWidget from "./CalendarWidget";
import { useState } from "react";
import { PawPrint } from "lucide-react";

function AppointmentMainLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <FirstContainer>
        <CalendarHeaderBox>
          <CalendarHeader>
            <Heading as="h5">Calendar</Heading>
            <HeaderText>
              Manage appointments and care schedules for all your pets
            </HeaderText>
          </CalendarHeader>
        </CalendarHeaderBox>
      </FirstContainer>
      <SecondContainer>
        <CalendarBox>
          <CalendarWidget />
        </CalendarBox>
      </SecondContainer>
    </MainLayoutContainer>
  );
}
const MainLayoutContainer = styled.div`
  flex: 4;
  background-color: #fce9d0;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem;
  padding-top: 2.5rem;
  padding-bottom: 2rem;
  transition: transform 0.3s ease;
  @media (max-width: 767px) {
    width: 100%;
    transform: ${({ openSidebar }) =>
      openSidebar ? "translateX(75%)" : "translateX(0)"};
    padding-top: 2rem;
    padding: 1.8rem;
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
  @media (max-width: 767px) {
    display: block;
  }
`;
const FirstContainer = styled.div``;
const CalendarHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CalendarHeader = styled.div`
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

const SecondContainer = styled.div`
  margin-top: 40px;
`;
const CalendarBox = styled.div`
  height: 583px;
  border-radius: 10px;
  overflow: visible;
`;
export default AppointmentMainLayout;
