import styled from "styled-components";
import { Heading } from "./Heading";
import { useFetchPets } from "../Hooks/usePets";
import { useState } from "react";
import AddPetModal from "./AddPetModal";
import {
  Activity,
  Cake,
  Calendar,
  Dot,
  Ellipsis,
  Heart,
  NotebookPen,
  PawPrint,
  Plus,
  SquarePen,
  Trash2,
  UserRound,
  Weight,
} from "lucide-react";
import { useFetchAllHealthlogs } from "../Hooks/useHealthlogs";
import { useFetchAllAppointments } from "../Hooks/useAppointments";
import { format } from "date-fns";
import { useFetchAllNotes } from "../Hooks/useNotes";
import Loader from "./Loader";

function MyPetsMainLayout() {
  const { pets } = useFetchPets();
  const [showModal, setShowModal] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [mode, setMode] = useState("edit");
  //const [selectedId, setSelectedId] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const allHealthlogs = useFetchAllHealthlogs();
  const allAppointments = useFetchAllAppointments();
  const allNotes = useFetchAllNotes();
  //const dropdownRef = useRef();
  {
    /*useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectedId]); */
  }
  const isLoading =
    allNotes.isLoading || allHealthlogs.isLoading || allAppointments.isLoading;
  if (isLoading) return <Loader />;
  const Healthlog = allHealthlogs?.data;
  const Appointment = allAppointments?.data;
  const Note = allNotes?.data;
  function truncateTitle(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 3 : 6;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }

  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <FirstContainer>
        <Heading as="h5">{pets.length > 1 ? "My Pets" : "My Pet"}</Heading>
        <HeaderText>
          {pets.length > 1
            ? "Manage and track all your furry friends in one place"
            : "Manage and track your furry friend in one place"}
        </HeaderText>
      </FirstContainer>
      <SecondContainer>
        <AddPetButton
          onClick={() => {
            setShowModal(true);
            setMode("add");
            setEditPet(null);
          }}
        >
          <Plus size={21} />
          Add New Pet
        </AddPetButton>
        <AddPetModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          mode={mode}
          initialPetData={editPet}
        />
      </SecondContainer>
      <ThirdContainer>
        {pets.map((pet) => {
          const petHealthlog = Healthlog.filter((log) => log.pet_id === pet.id);
          const petAppointment = Appointment.filter(
            (appt) => appt.pet_id === pet.id
          );
          const petNote = Note.filter((note) => note.pet_id === pet.id);
          const recentHealthlog =
            petHealthlog.length > 0 ? petHealthlog[0] : null;
          const recentAppointment =
            petAppointment.length > 0 ? petAppointment[0] : null;
          const recentNote = petNote.length > 0 ? petNote[0] : null;
          const avatar_url = pet.avatar_url;
          return (
            <Card key={pet.id}>
              <CardSection1>
                {avatar_url ? (
                  <PetImg>
                    <PetImage src={avatar_url} />
                  </PetImg>
                ) : (
                  <PetImg>
                    <PetChar>{pet.name.charAt(0)}</PetChar>
                  </PetImg>
                )}
                <PetInfo>
                  <PetName>
                    <Heading as="h11">{pet.name}</Heading>
                  </PetName>
                </PetInfo>
              </CardSection1>
              <CardSection2>
                <RecentActivity>
                  <Heading as="h12">
                    <Activity color="red" size={20} />
                    Recent Activity
                  </Heading>
                  {recentHealthlog ? (
                    <RecentHealthLogDiv>
                      <RecentHealthLogTitle>
                        <Icon>
                          <Heart size={17} color="#c13e62" />
                        </Icon>
                        {truncateTitle(recentHealthlog?.title)}
                      </RecentHealthLogTitle>
                      <RecentHealthLogDate>
                        {recentHealthlog?.date &&
                          format(recentHealthlog.date, "MMMM, d")}
                      </RecentHealthLogDate>
                    </RecentHealthLogDiv>
                  ) : (
                    ""
                  )}
                  {recentAppointment ? (
                    <RecentAppointmentDiv>
                      <RecentAppointmentTitle>
                        <Icon>
                          <Calendar size={17} color="#1d4ed8" />
                        </Icon>
                        {recentAppointment?.event_title}
                      </RecentAppointmentTitle>
                      <RecentAppointmentDate>
                        {recentAppointment?.date &&
                          format(recentAppointment.date, "MMMM, d")}
                      </RecentAppointmentDate>
                    </RecentAppointmentDiv>
                  ) : (
                    ""
                  )}
                  {recentNote ? (
                    <RecentNotesDiv>
                      <RecentNotesTitle>
                        <Icon>
                          <NotebookPen size={17} color="#fdc700" />
                        </Icon>
                        {truncateTitle(recentNote?.title)}
                      </RecentNotesTitle>
                      <RecentNotesDate>
                        {recentNote.created_at &&
                          format(recentNote.created_at, "MMMM, d")}
                      </RecentNotesDate>
                    </RecentNotesDiv>
                  ) : (
                    ""
                  )}
                  {!recentAppointment && !recentHealthlog && !recentNote && (
                    <GreyedText>No Recent Activity</GreyedText>
                  )}
                </RecentActivity>
              </CardSection2>
              {/* 
              
              <CardButton
                key={pet.id}
                onClick={() =>
                  setSelectedId((prev) => (prev === pet.id ? null : pet.id))
                }
              >
                <Ellipsis size={20} />
              </CardButton>
              {selectedId === pet.id && (
                <Dropdown ref={dropdownRef}>
                  <EditPetButton
                    onClick={() => {
                      setShowModal(true);
                      setMode("edit");
                      setEditPet(pet);
                    }}
                  >
                    <Pen /> Edit pet
                  </EditPetButton>
                  <DeletePetButton>
                    <Trash /> Delete pet
                  </DeletePetButton>
                </Dropdown>
              )}
              */}
            </Card>
          );
        })}
      </ThirdContainer>
    </MainLayoutContainer>
  );
}
const MainLayoutContainer = styled.div`
  flex: 4;
  overflow-y: scroll;
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
const FirstContainer = styled.div`
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
  margin-top: 35px;
`;
const ThirdContainer = styled.div`
  margin-top: 80px;
  @media (max-width: 767px) {
    margin-top: 60px;
  }
`;
const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  display: flex;
  position: relative;
  margin-top: 25px;
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }
`;
const AddPetButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  font-size: 1rem;
  margin-top: 20px;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  color: #ffffff;
  font-family: inherit;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const CardSection1 = styled.div`
  flex: 1;
  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    gap: 0.6rem;
  }
`;
const PetImg = styled.div`
  height: 150px;
  width: 150px;
  background-color: #fffaf4;
  color: #ed4a2f;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  @media (max-width: 767px) {
    height: 120px;
    width: 120px;
    font-size: 2.3rem;
    margin-top: 20px;
  }
`;
const PetImage = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
`;
const PetImgDiv = styled.div`
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const PetInfo = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  width: 90%;
  @media (max-width: 767px) {
    margin: 0;
  }
`;
const PetChar = styled.div`
  height: 150px;
  width: 150px;
  background-color: #fffaf4;
  color: #ed4a2f;
  font-size: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  @media (max-width: 767px) {
    height: 120px;
    width: 120px;
    font-size: 2.3rem;
  }
`;
const Breed = styled.p`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const Age = styled.p`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const Gender = styled.p`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;
const WeightInfo = styled.p`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;
const CardSection2 = styled.div`
  height: 315px;
  flex: 3;
  @media (max-width: 767px) {
    width: 100%;
    margin-top: 10px;
  }
`;
const PetName = styled.div`
  margin-top: 20px;
  width: fit-content;
  margin-left: 20px;
  width: 90%;
  word-break: break-all;
  @media (max-width: 767px) {
    margin-top: 55px;
  }
`;
const HealthOverview = styled.div`
  align-items: center;
  height: 31%;
  @media (max-width: 767px) {
    display: none;
  }
`;
const RecentActivity = styled.div`
  align-items: center;
  height: 69%;
  @media (max-width: 767px) {
  }
`;
const CardButton = styled.button`
  height: fit-content;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  &:hover {
    background-color: #fffaf4;
    color: #ed4a2f;
    cursor: pointer;
  }
`;
const Dropdown = styled.div`
  position: absolute;
  padding: 0.5rem;
  gap: 0.2rem;
  display: flex;
  flex-direction: column;
  top: 210px;
  right: 43px;
  border-radius: 10px;
  background-color: #fffaf4;
  @media (max-width: 767px) {
    right: 90px;
  }
`;
const EditPetButton = styled.button`
  border: none;
  padding: 0.8rem 1rem;
  font-family: inherit;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
const DeletePetButton = styled.button`
  border: none;
  padding: 0.8rem 1rem;
  font-family: inherit;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  color: red;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
const Trash = styled(Trash2)`
  margin-right: 10px;
`;
const Pen = styled(SquarePen)`
  margin-right: 10px;
`;
const RecentHealthLogDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  @media (max-width: 767px) {
  }
`;
const RecentHealthLogDate = styled.div`
  font-size: 0.95rem;
  margin-right: 15px;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;
const RecentHealthLogTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 400px;
  word-break: break-all;
  @media (max-width: 767px) {
    width: 220px;
  }
`;
const RecentAppointmentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;
const RecentAppointmentTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 400px;
  word-break: break-all;
  @media (max-width: 767px) {
    width: 220px;
  }
`;
const RecentAppointmentDate = styled.div`
  font-size: 0.95rem;
  margin-right: 15px;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;
const RecentNotesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
`;
const GreyedText = styled.p`
  color: #99a1af;
  font-size: 1.1rem;
  margin-top: 20px;
  margin-left: 10px;
  @media (max-width: 767px) {
    margin-top: -1px;
  }
`;
const RecentNotesTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 400px;
  word-break: break-all;
  @media (max-width: 767px) {
    width: 220px;
  }
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
`;
const RecentNotesDate = styled.div`
  font-size: 0.95rem;
  margin-right: 15px;
  @media (max-width: 767px) {
    font-size: 0.85rem;
  }
`;
const LastHealthLogDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;
const LastHealthLogTitle = styled.div``;
const LastHealthLogDate = styled.div`
  font-size: 0.95rem;
  margin-right: 15px;
`;
const NextAppointmentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 5px;
`;
const NextAppointmentTitle = styled.div``;
const NextAppointmentDate = styled.div`
  font-size: 0.95rem;
  margin-right: 15px;
`;

export default MyPetsMainLayout;
