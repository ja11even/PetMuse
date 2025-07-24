import styled from "styled-components";
import { Heading } from "./Heading";
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronRight,
  Clock,
  Dot,
  Ellipsis,
  FileText,
  Heart,
  MapPin,
  NotebookPen,
  PawPrint,
  Pill,
  Plus,
  Stethoscope,
  Syringe,
  TriangleAlert,
  UsersRound,
  Weight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AddPetModal from "./AddPetModal";
import { useUser } from "../Hooks/useUser";
import { useFetchPets } from "../Hooks/usePets";
import { useFetchHealthlogs } from "../Hooks/useHealthlogs";
import { useAppointments } from "../Hooks/useAppointments";
import { format, parseISO } from "date-fns";
import { useFetchNotes } from "../Hooks/useNotes";
import { Link } from "react-router-dom";
import HealthlogsModal from "./HealthlogsModal";
import NotesModal from "./NotesModal";
import { useSelectedPet } from "./useSelectedPet";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";

const HLDetailsHeader = styled.p`
  color: ${(props) => getColor(props.type)};
  font-size: 1.15rem;
`;
const getColor = (type) => {
  if (!type) return;
  return logTypeColors[type.toLowerCase()];
};
const logTypeColors = {
  vaccination: "#3a803e",
  illnesssymptoms: "#ba3523",
  medication: "#8044ce",
  vetvisit: "#1d4ed8",
  weightcheck: "#c24225",
  other: "#c13e62",
};
function DashboardMainLayout() {
  const { user, isLoadingUser } = useUser();
  const { pets, isLoadingPets } = useFetchPets();
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("");
  const [showLogModal, setShowLogModal] = useState(false);
  const [logMode, setLogMode] = useState("");
  const [editLog, setEditLog] = useState(null);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteMode, setNoteMode] = useState("");
  const [editNote, setEditNote] = useState(null);
  const [switcher, setSwitcher] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { selectedPet, setSelectedPet } = useSelectedPet();
  const fetchHealthlogs = useFetchHealthlogs();
  const fetchAppointments = useAppointments();
  const fetchNotes = useFetchNotes();
  const switcherRef = useRef();
  const toggleButtonRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setSwitcher(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setSwitcher(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoading =
    fetchHealthlogs.isLoading ||
    fetchAppointments.isLoading ||
    isLoadingPets ||
    fetchNotes.isLoading ||
    isLoadingUser;
  if (isLoading) return <Loader />;
  const recentHealthlog = fetchHealthlogs?.data?.slice(0, 2);
  const recentAppointment = fetchAppointments?.data?.slice(0, 1);
  const r = fetchAppointments?.data?.[0]?.date;
  const futureAppointment = new Date(r) > new Date();
  const recentNotes = fetchNotes?.data?.slice(0, 2);
  const petChar = selectedPet?.name?.charAt(0);
  const avatar_url = selectedPet?.avatar_url;

  const logTypeBlocks = {
    vaccination: (
      <VaccinationIcon>
        <Syringe size={25} />
      </VaccinationIcon>
    ),
    illnesssymptoms: (
      <IllnessIcon>
        <TriangleAlert size={25} />
      </IllnessIcon>
    ),
    medication: (
      <MedicationIcon>
        <Pill size={25} />
      </MedicationIcon>
    ),
    vetvisit: (
      <VetVisitIcon>
        <Stethoscope size={25} />
      </VetVisitIcon>
    ),
    weightcheck: (
      <WeightIcon>
        <Weight size={25} />
      </WeightIcon>
    ),
    other: (
      <OtherIcon>
        <Heart size={25} />
      </OtherIcon>
    ),
  };
  function truncateNotes(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 4 : 20;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }
  function truncateTitle(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 3 : 6;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }
  function truncateApptTitle(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 2 : 6;
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
        {pets.length === 0 ? (
          <FirstContainerHeader>
            <Heading as="h5">
              Welcome to PetMuse, {user?.user_metadata?.firstName}
            </Heading>
            <HeaderText>
              Let's get started by adding your first pet to unlock all features.
            </HeaderText>
          </FirstContainerHeader>
        ) : (
          <FirstContainerDetails>
            <FirstContainerHeader>
              <Heading as="h5">{user?.user_metadata?.firstName},</Heading>
              <HeaderText>
                Here's what's happening with {selectedPet?.name}
              </HeaderText>
            </FirstContainerHeader>
            <PetSwitcher>
              {selectedPet && (
                <>
                  {avatar_url ? (
                    <PetImg>
                      <PetImage src={avatar_url} />
                    </PetImg>
                  ) : (
                    <PetImg>
                      <PetCharName>{petChar}</PetCharName>
                    </PetImg>
                  )}
                  <PetName>{selectedPet?.name} </PetName>
                </>
              )}
              {pets?.length >= 1 && (
                <ChevronDown
                  size={21}
                  color="#ed4a2f"
                  ref={toggleButtonRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSwitcher((prev) => !prev);
                  }}
                />
              )}
            </PetSwitcher>
            <AnimatePresence>
              {switcher && (
                <SwitcherDropdown
                  ref={switcherRef}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {pets.map((pet) => (
                    <Switcher
                      key={pet.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPet(pet);
                        setSwitcher(false);
                      }}
                    >
                      {avatar_url ? (
                        <SwitcherPetImg>
                          <SwitcherPetImage src={avatar_url} />
                        </SwitcherPetImg>
                      ) : (
                        <SwitcherPetImg>
                          <PetCharName>{pet.name.charAt(0)}</PetCharName>
                        </SwitcherPetImg>
                      )}
                      <PetName>{pet.name}</PetName>
                    </Switcher>
                  ))}
                </SwitcherDropdown>
              )}
            </AnimatePresence>
          </FirstContainerDetails>
        )}
      </FirstContainer>
      <SecondContainer>
        {pets.length === 0 ? (
          <PetBox>
            <IconDiv>
              <PawPrint size={30} fill="#ed4a2f" color="#ed4a2f" />
            </IconDiv>
            <Heading as="h7">No pets added yet</Heading>
            <PetBoxText>
              Start your pet care journey by adding your first furry friend.
              You'll be able to track their health, schedule appointments, and
              set up reminders.
            </PetBoxText>
            <AddPetButton
              onClick={() => {
                setShowModal(true);
                setMode("add");
              }}
            >
              <Plus size={20} />
              Add Your First Pet
            </AddPetButton>
            <AddPetModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              mode={mode}
            />
          </PetBox>
        ) : (
          <PetCard>
            <PetCard1>
              <PetCardInfo>
                <PetCardImgDiv>
                  {avatar_url ? (
                    <PetCardImg>
                      <Img src={avatar_url} />
                    </PetCardImg>
                  ) : (
                    <PetCardImg>{petChar}</PetCardImg>
                  )}
                </PetCardImgDiv>

                <PetCardDetails>
                  <PetCardDetails1>
                    <Heading as="h4">{selectedPet?.name}</Heading>
                  </PetCardDetails1>
                  <PetGender>{selectedPet?.gender}</PetGender>
                  <PetCardBreed>{selectedPet?.breed}</PetCardBreed>
                  <PetCardAge>
                    {selectedPet?.age}{" "}
                    {selectedPet?.age > 1 ? "years old" : "year old"}
                  </PetCardAge>
                  <PCValue>{`${selectedPet?.weight} ${selectedPet?.unit}`}</PCValue>
                </PetCardDetails>
              </PetCardInfo>
            </PetCard1>
            {futureAppointment && (
              <PetCard2>
                <PetCardAppointment>
                  <PCText>
                    <Calendar size={17} color="#ed4a2f" />
                    Next appointment:
                  </PCText>
                  <PCApptValue>{format(r, "EEE, MMMM d")}</PCApptValue>
                </PetCardAppointment>
              </PetCard2>
            )}
          </PetCard>
        )}
      </SecondContainer>
      <ThirdContainer>
        {pets.length === 0 ? (
          <>
            <ThirdContainerHeader>
              <Heading as="h3">What you can do with PetMuse</Heading>
              <Text1>
                These features will become available once you add your first pet
              </Text1>
            </ThirdContainerHeader>
            <BoxContainer>
              <Box>
                <FirstBoxDiv>
                  <UsersRound color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">Multi-pet care</Heading>
                <BoxText>
                  Manage multiple pets in one place with individual profiles and
                  care plans.
                </BoxText>
              </Box>
              <Box>
                <FirstBoxDiv>
                  <Calendar color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">Calendar scheduling</Heading>
                <BoxText>
                  Schedule and track vet visits, grooming, training and other
                  important events.
                </BoxText>
              </Box>
              <Box>
                <FirstBoxDiv>
                  <Heart color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">Health tracking</Heading>
                <BoxText>
                  Log medications, vaccinations, weight and other health metrics
                  over time.
                </BoxText>
              </Box>
              <Box>
                <FirstBoxDiv>
                  <NotebookPen color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">Notes</Heading>
                <BoxText>
                  Add personal reminders, to-dos, or cute little thoughts for
                  any pet directly on the dashboard.
                </BoxText>
              </Box>
              <Box>
                <FirstBoxDiv>
                  <FileText color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">PDF export</Heading>
                <BoxText>
                  Export health logs and appointment records to share with vets
                  or keep as a backup.
                </BoxText>
              </Box>
              <Box>
                <FirstBoxDiv>
                  <Bell color="#99a1af" />
                  <TextDiv>Add pet to unlock</TextDiv>
                </FirstBoxDiv>
                <Heading as="h8">Reminders & alerts</Heading>
                <BoxText>
                  Never miss an important appointment or medication with
                  customizable alerts.
                </BoxText>
              </Box>
            </BoxContainer>
          </>
        ) : (
          <>
            <RecentAppointments>
              <RecentAppointmentsCard1>
                <RecentAppointmentsHeader>
                  <Heading as="h4">Recent Appointments</Heading>
                  <RAHeaderText>
                    {selectedPet?.name}'s appointment history and upcoming
                    visits
                  </RAHeaderText>
                </RecentAppointmentsHeader>
                <RecentAppointmentsButtons>
                  <ButtonLink to="/appointments">
                    <RAScheduleButton>
                      <Plus size={17} /> Schedule
                    </RAScheduleButton>
                    <MobileScheduleButton>
                      <Plus size={17} />
                    </MobileScheduleButton>
                  </ButtonLink>
                </RecentAppointmentsButtons>
              </RecentAppointmentsCard1>
              {recentAppointment?.map((rsa) => {
                const location = rsa.location;
                const eventtitle = rsa.event_title;
                const description = rsa.description;
                return (
                  <>
                    <Status>{futureAppointment ? "Upcoming" : "Recent"}</Status>
                    <RecentAppointmentsCard2>
                      <RADetails>
                        <RATime>
                          <RADate>
                            {rsa.date &&
                              format(parseISO(rsa.date), "EEE, MMMM d")}
                          </RADate>
                          <RAtime>{rsa.time}</RAtime>
                        </RATime>
                        <RAHeaderDetails>
                          <RAHeaderDetail>
                            {truncateApptTitle(eventtitle)}
                          </RAHeaderDetail>
                          <RALocation>
                            <MapPin size={17} color="#ffffff" fill="#c10007" />{" "}
                            {truncateTitle(location)}
                          </RALocation>
                          <RANotes>{truncateNotes(description)}</RANotes>
                        </RAHeaderDetails>
                      </RADetails>
                    </RecentAppointmentsCard2>
                  </>
                );
              })}
              {!recentAppointment ||
                (recentAppointment.length === 0 && (
                  <GreyedText>
                    Keep track of vet visits, and more. Start by adding your
                    first appointment.
                  </GreyedText>
                ))}
            </RecentAppointments>

            <HealthLog>
              <HealthLogCard1>
                <HealthLogHeader>
                  <Heading as="h4">Health Log Overview</Heading>
                  <HLHeaderText>
                    Recent health records and tracking for {selectedPet?.name}
                  </HLHeaderText>
                </HealthLogHeader>
                <HealthLogButtons>
                  <HLAddLogButton
                    onClick={() => {
                      setShowLogModal(true);
                      setLogMode("add");
                      setEditLog(null);
                    }}
                  >
                    <Plus size={17} /> Add Log
                  </HLAddLogButton>
                  <MobileHLAddButton
                    onClick={() => {
                      setShowLogModal(true);
                      setLogMode("add");
                      setEditLog(null);
                    }}
                  >
                    <Plus size={17} />
                  </MobileHLAddButton>
                  <ButtonLink to="/healthlogs">
                    <HLViewAllButton>
                      View All <ChevronRight size={17} />{" "}
                    </HLViewAllButton>
                  </ButtonLink>
                </HealthLogButtons>
              </HealthLogCard1>
              <HealthlogsModal
                isOpen={showLogModal}
                onClose={() => setShowLogModal(false)}
                mode={logMode}
                initialData={editLog}
              />
              {recentHealthlog?.map((healthlog) => {
                const logtitle = healthlog.title;
                const lognotes = healthlog.notes;
                return (
                  <HealthLogCard2 key={healthlog.id}>
                    <Details1>
                      <HLIconDiv>{logTypeBlocks[healthlog.log_type]}</HLIconDiv>
                      <HLDetails>
                        <HLDetailsHeader type={healthlog.log_type}>
                          {truncateTitle(logtitle)}
                        </HLDetailsHeader>
                        <HLDetailsInfo>{truncateNotes(lognotes)}</HLDetailsInfo>
                      </HLDetails>
                    </Details1>
                    <HLExtra>
                      <HLDate>{format(healthlog.created_at, "MMMM d")}</HLDate>
                    </HLExtra>
                  </HealthLogCard2>
                );
              })}
              {!recentHealthlog ||
                (recentHealthlog.length === 0 && (
                  <GreyedText>
                    Add logs for medications or checkups. Start by adding your
                    first health log.
                  </GreyedText>
                ))}
            </HealthLog>
            <Notes>
              <NotesCard1>
                <NotesHeader>
                  <Heading as="h4">Notes</Heading>
                  <NotesHeaderText>
                    Quick notes and observations about {selectedPet?.name}
                  </NotesHeaderText>
                </NotesHeader>
                <NotesButtons>
                  <NotesAddNoteButton
                    onClick={() => {
                      setShowNoteModal(true);
                      setNoteMode("add");
                      setEditNote(null);
                    }}
                  >
                    <Plus size={17} />
                    Add Note
                  </NotesAddNoteButton>
                  <MobileNoteAddButton
                    onClick={() => {
                      setShowNoteModal(true);
                      setNoteMode("add");
                      setEditNote(null);
                    }}
                  >
                    <Plus size={17} />
                  </MobileNoteAddButton>
                  <ButtonLink to="/notes">
                    <NotesViewAllButton>
                      View All <ChevronRight size={17} />
                    </NotesViewAllButton>
                  </ButtonLink>
                </NotesButtons>
              </NotesCard1>
              <NotesModal
                isOpen={showNoteModal}
                onClose={() => setShowNoteModal(false)}
                initialData={editNote}
                mode={noteMode}
              />
              {recentNotes?.map((note) => {
                const title = note.title;
                const notes = note.notes;
                return (
                  <NotesCard2 key={note.id}>
                    <NotesCardInfo>
                      <NotesInfo>{truncateTitle(title)}</NotesInfo>
                      <NotesOutput>{truncateNotes(notes)}</NotesOutput>
                    </NotesCardInfo>
                    <NotesExtra>
                      <NotesDate>{format(note.created_at, "MMMM d")}</NotesDate>
                    </NotesExtra>
                  </NotesCard2>
                );
              })}
              {!recentNotes ||
                (recentNotes.length === 0 && (
                  <GreyedText>
                    Jot down behaviour, or anything worth remembering. Start
                    with your first note.
                  </GreyedText>
                ))}
            </Notes>
          </>
        )}
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
const FirstContainer = styled.div``;
const HeaderText = styled.p`
  font-size: 1.1rem;
  @media (max-width: 767px) {
    font-size: 1.05rem;
  }
`;
const SecondContainer = styled.div`
  margin-top: 40px;
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

const PetBox = styled.div`
  border: 1px dashed #ed4a2f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  border-radius: 10px;
  @media (max-width: 767px) {
    overflow: hidden;
  }
`;
const IconDiv = styled.div`
  height: 50px;
  width: 50px;
  background-color: #fce9d0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const PetBoxText = styled.p`
  width: 470px;
  word-wrap: break-word;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 5px;
  @media (max-width: 767px) {
    width: 268px;
  }
`;
const PCText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
const PCValue = styled.div`
  display: flex;
  align-items: center;
  color: #ed4a2f;
`;
const PCApptValue = styled.div`
  display: flex;
  align-items: center;
  color: #ed4a2f;
  margin-left: 11px;
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
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
const ThirdContainer = styled.div`
  margin-top: 40px;
`;
const BoxContainer = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 16.6px;
  margin-top: 20px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
const Box = styled.div`
  border: 1px solid #99a1af;
  width: 32.3%;
  padding: 1rem;
  border-radius: 10px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const FirstBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const TextDiv = styled.div`
  color: #99a1af;
  background-color: #e5e7eb;
  padding: 0 0.6rem;
  border-radius: 20px;
`;
const BoxText = styled.p`
  color: #99a1af;
  padding-bottom: 10px;
`;
const SecondBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16.6px;
  margin-top: 40px;
  border: 1px solid white;
`;
const SecondBox = styled.div`
  border: 1px dashed #ed4a2f;
  width: 32.3%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;
const BoxTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BoxTitle = styled.p`
  font-size: 1rem;
  color: #ed4a2f;
`;
const SecondBoxText = styled.p``;
const SecondBoxButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding: 0.5rem;
  border: none;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  color: #ffffff;
  &:hover {
    cursor: pointer;
  }
`;
const NotesBox = styled.div``;
const Text1 = styled.p`
  font-size: 1.1rem;
  @media (max-width: 767px) {
    font-size: 1.05rem;
  }
`;
const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;
const PetSwitcher = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: auto;
  border: none;
  padding: 0.4rem 0.8rem;
  background-color: #ffffff;
  border-radius: 10px;
  @media (max-width: 767px) {
  }
`;
const PetName = styled.p``;
const PetCharName = styled.p``;
const PetImg = styled.div`
  height: 40px;
  width: 40px;
  background-color: #fffaf4;
  border-radius: 50%;
  color: #ed4a2f;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PetImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
const SwitcherPetImg = styled.div`
  height: 30px;
  width: 30px;
  background-color: #ffffff;
  border-radius: 50%;
  color: #ed4a2f;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SwitcherPetImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;
const SwitcherDropdown = styled(motion.div)`
  background-color: #fffaf4;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: absolute;
  right: 20px;
  top: 80px;
  padding: 0.5rem 1rem;
  border-radius: 10px;
`;
const Switcher = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
const FirstContainerDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 767px) {
    gap: 0.6rem;
  }
`;
const FirstContainerHeader = styled.div`
  line-height: 1.4;
  width: auto;
  @media (max-width: 767px) {
  }
`;
const PetCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #ffffff;
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;
const PetCard1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  @media (max-width: 767px) {
  }
`;
const PetCard2 = styled.div`
  display: flex;
  width: 100%;

  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #ed4a2f;
`;
const PetCardImg = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  background-color: #fffaf4;
  color: #ed4a2f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  @media (max-width: 767px) {
    height: 120px;
    width: 120px;
  }
`;
const Img = styled.img`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  @media (max-width: 767px) {
    height: 120px;
    width: 120px;
  }
`;
const PetCardDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  @media (max-width: 767px) {
  }
`;
const PetCardDetails1 = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const PetGender = styled.p``;
const PetCardCreationDate = styled.p`
  font-size: 0.95rem;
`;
const PetCardWeight = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
`;
const PetCardAppointment = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.95rem;
`;
const PetCardHealthLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.95rem;
`;
const ThirdContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.4;
  @media (max-width: 767px) {
  }
`;
const PetCardBreed = styled.p``;
const PetCardAge = styled.p``;
const PetCardColor = styled.p``;
const PetCardButtonDiv = styled.div``;
const PetCardInfo = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  @media (max-width: 767px) {
    gap: 1rem;
  }
`;
const PetCardImgDiv = styled.div`
  @media (max-width: 767px) {
  }
`;
const PetCardActionButton = styled.button`
  height: fit-content;
  border: none;
  height: 30px;
  width: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-self: flex-start;
  &:hover {
    color: #ed4a2f;
    background-color: #fffaf4;
    cursor: pointer;
  }
`;
const ChevDown = styled(ChevronDown)`
  margin-left: 35px;
`;
const RecentAppointments = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;
const RecentAppointmentsCard1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: fit-content;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;
const RecentAppointmentsHeader = styled.div`
  line-height: 1.4;
  @media (max-width: 767px) {
    width: 255px;
  }
`;
const RecentAppointmentsButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
const RAHeaderText = styled.p``;
const RAScheduleButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  font-family: inherit;
  color: #ffffff;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const MobileScheduleButton = styled.button`
  background-color: #fffaf4;
  display: none;
  border: none;
  @media (max-width: 767px) {
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: #ed4a2f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const RAViewAllButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid #ed4a2f;
  font-family: inherit;
  color: #ed4a2f;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
  &:focus {
    outline: none;
  }
`;
const RecentAppointmentsCard2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;
const RATime = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  line-height: 1.4;
`;
const RADate = styled.p`
  font-size: 0.9rem;
  color: #ed4a2f;
`;
const RAtime = styled.p`
  font-size: 0.9rem;
  color: #ed4a2f;
`;
const RADetails = styled.div`
  gap: 1rem;
  display: flex;
`;
const RAHeaderDetails = styled.div`
  line-height: 1.4;
  border-left: 1px solid #ed4a2f;
  padding-left: 10px;
`;
const RAHeaderDetail = styled.p`
  font-size: 1.15rem;
  color: #ed4a2f;
`;
const RAHeaderStatus = styled.p``;
const RAEdit = styled.button`
  height: fit-content;
  border: none;
  height: 30px;
  width: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-self: flex-start;
  &:hover {
    color: #ed4a2f;
    background-color: #fffaf4;
    cursor: pointer;
  }
`;
const RAEditDiv = styled.div``;
const Status = styled.p`
  color: #3a803e;
  margin-top: 10px;
`;
const RALocation = styled.p`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.95rem;
`;
const RANotes = styled.p`
  font-size: 0.95rem;
  margin-top: 5px;
`;
const HealthLog = styled.div`
  margin-top: 40px;
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;
const HealthLogCard1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;
const HealthLogHeader = styled.div`
  line-height: 1.4;
  @media (max-width: 767px) {
    width: 255px;
  }
`;
const HLHeaderText = styled.p`
  font-size: 1rem;
`;
const HealthLogButtons = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 767px) {
    gap: 0rem;
  }
`;
const HLAddLogButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  font-family: inherit;
  color: #ffffff;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const MobileHLAddButton = styled.button`
  background-color: #fffaf4;
  display: none;
  border: none;
  @media (max-width: 767px) {
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: #ed4a2f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const HLViewAllButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid #ed4a2f;
  font-family: inherit;
  color: #ed4a2f;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const HealthLogCard2 = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0rem;
`;
const GreyedText = styled.p`
  color: #99a1af;
`;
const Details1 = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 767px) {
    width: 250px;
  }
`;
const HLIconDiv = styled.div``;
const HLDetails = styled.div`
  line-height: 1.4;
`;
const HLDetailsInfo = styled.p`
  font-size: 1rem;
`;
const HLExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const HLDate = styled.p`
  font-size: 0.9rem;
  color: #ed4a2f;
`;
const HLEdit = styled.button`
  height: fit-content;
  border: none;
  height: 30px;
  width: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-self: flex-start;
  &:hover {
    color: #ed4a2f;
    background-color: #fffaf4;
    cursor: pointer;
  }
`;
const Notes = styled.div`
  padding: 1.5rem;
  border-radius: 10px;
  background-color: white;
  margin-top: 40px;
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;
const NotesCard1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;
const NotesHeader = styled.div`
  line-height: 1.4;
  @media (max-width: 767px) {
    width: 255px;
  }
`;
const NotesHeaderText = styled.p`
  font-size: 1rem;
`;
const NotesButtons = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 767px) {
    gap: 0rem;
  }
`;
const NotesAddNoteButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: #ed4a2f;
  font-family: inherit;
  color: #ffffff;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const MobileNoteAddButton = styled.button`
  background-color: #fffaf4;
  display: none;
  border: none;
  @media (max-width: 767px) {
    display: block;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    color: #ed4a2f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const NotesViewAllButton = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  font-size: 0.9rem;
  gap: 0.5rem;
  border-radius: 5px;
  background-color: transparent;
  border: 1px solid #ed4a2f;
  font-family: inherit;
  color: #ed4a2f;
  width: 110px;
  height: 42px;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    display: none;
  }
`;
const NotesCard2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  border-top: 1px solid #ed4a2f;
  border-bottom: 1px solid #ed4a2f;
  padding: 0.5rem 0rem;
`;
const NotesCardInfo = styled.div`
  line-height: 1.4;

  @media (max-width: 767px) {
    width: 250px;
  }
`;
const NotesInfo = styled.p`
  color: #ed4a2f;
  font-size: 1.15rem;
`;
const NotesOutput = styled.p`
  font-size: 1rem;
`;
const NotesExtra = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const NotesDate = styled.p`
  font-size: 0.9rem;
  color: #ed4a2f;
`;
const NotesEdit = styled.button`
  height: fit-content;
  border: none;
  height: 30px;
  width: 30px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-self: flex-start;
  &:hover {
    color: #ed4a2f;
    background-color: #fffaf4;
    cursor: pointer;
  }
`;
const NotesCard3 = styled.div``;
const AllNotesButton = styled.button``;
const SearchNotesButton = styled.button``;
const VaccinationIcon = styled.div`
  color: #3a803e;
  background-color: #dcfbe7;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const IllnessIcon = styled.div`
  background-color: #fae2e2;
  color: #ba3523;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const MedicationIcon = styled.div`
  background-color: #f3e8fe;
  color: #8044ce;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const VetVisitIcon = styled.div`
  background-color: #dbeafe;
  color: #1d4ed8;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const WeightIcon = styled.div`
  background-color: #fdecd5;
  color: #c24225;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const OtherIcon = styled.div`
  background-color: #fbe7f3;
  color: #c13e62;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
const ButtonLink = styled(Link)`
  text-decoration: none;
`;
export default DashboardMainLayout;
