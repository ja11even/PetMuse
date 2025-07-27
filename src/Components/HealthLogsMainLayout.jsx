import styled from "styled-components";
import { Heading } from "./Heading";
import {
  Calendar,
  CircleAlert,
  Dot,
  Ellipsis,
  Heart,
  Hospital,
  PawPrint,
  Pill,
  PillBottle,
  Plus,
  Search,
  SquarePen,
  Stethoscope,
  Syringe,
  Trash2,
  TriangleAlert,
  UserRound,
  Weight,
} from "lucide-react";
import HealthlogsModal from "./HealthlogsModal";
import { useEffect, useRef, useState } from "react";
import {
  useDeleteHealthlogs,
  useFetchHealthlogs,
} from "../Hooks/useHealthlogs";
import { format } from "date-fns";
import SpinnerMini from "./SpinnerMini";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
const getColor = (type) => {
  if (!type) return;
  return logTypeColors[type.toLowerCase()];
};
const LogTitle = styled.p`
  color: ${(props) => getColor(props.type)};
  font-size: 1.2rem;
  font-weight: 300;
  word-break: break-all;
`;
const DueDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${(props) => getColor(props.type)};
  margin-top: 0.3rem;
  border: 1px solid ${(props) => getColor(props.type)};
  width: fit-content;
  padding: 0rem 0.5rem;
  border-radius: 50px;
`;
const logTypeColors = {
  vaccination: "#3a803e",
  illnesssymptoms: "#ba3523",
  medication: "#8044ce",
  vetvisit: "#1d4ed8",
  weightcheck: "#c24225",
  other: "#c13e62",
};
function HealthLogsMainLayout() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logMode, setLogMode] = useState("");
  const [editLog, setEditLog] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openSidebar, setOpenSidebar] = useState(false);
  const deleteHealthlogs = useDeleteHealthlogs();
  const fetchHealthlogs = useFetchHealthlogs();
  const dropdownRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectedId]);
  if (fetchHealthlogs.isPending) return <Loader />;
  const healthlogsData = fetchHealthlogs?.data;
  console.log(healthlogsData);
  const logTypeLabels = {
    vaccination: <VaccinationDiv>Vaccination</VaccinationDiv>,
    illnesssymptoms: <IllnessDiv>Illness/Symptoms</IllnessDiv>,
    medication: <MedicationDiv>Medication</MedicationDiv>,
    vetvisit: <VetVisitDiv>Vet Visit</VetVisitDiv>,
    weightcheck: <WeightDiv>Weight Check</WeightDiv>,
    other: <OtherDiv>Other</OtherDiv>,
  };
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

  function handleDeleteLog(id) {
    deleteHealthlogs.mutate(id);
  }
  const filteredLogs = healthlogsData.filter(
    (log) =>
      log.title.toLowerCase().includes(search.toLowerCase()) ||
      log.notes.toLowerCase().includes(search.toLowerCase())
  );
  const logsToDisplay = search ? filteredLogs : healthlogsData;
  const logsPerPage = 10;
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logsToDisplay.slice(indexOfFirstLog, indexOfLastLog);
  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((p) =>
      p < Math.ceil(logsToDisplay.length / logsPerPage) ? p + 1 : p
    );
  };
  function truncateNotes(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 10 : 20;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }
  function truncateTitle(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 2 : 5;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }
  function truncateInfo(text) {
    const isMobile = window.innerWidth <= 767;
    const limit = isMobile ? 4 : 7;
    const words = text.split(" ");
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(" ") + "...";
  }
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <HeaderContainer>
        <Heading as="h5">Health Logs</Heading>
        <HeaderText>
          Track and maintain detailed records of your pet's medical and wellness
          history
        </HeaderText>
      </HeaderContainer>
      <FirstContainer>
        <AddHealthlogButton
          onClick={() => {
            setShowLogModal(true);
            setLogMode("add");
            setEditLog(null);
          }}
        >
          <Plus size={21} />
          Add Log
        </AddHealthlogButton>
      </FirstContainer>
      <HealthlogsModal
        isOpen={showLogModal}
        onClose={() => setShowLogModal(false)}
        mode={logMode}
        initialData={editLog}
      />
      <SecondContainer>
        {healthlogsData.length > 0 && (
          <SecondContainer1>
            <Heading as="h9">Log Entries</Heading>
            <MostRecent>
              <InputWrapper>
                <SearchIcon size={15} color="#ed4a2f" />
                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search logs..."
                />
              </InputWrapper>
            </MostRecent>
          </SecondContainer1>
        )}
        {search && healthlogsData.length > 0 && filteredLogs.length === 0 && (
          <FilteredLogDiv>
            <CircleAlert />
            No results found
          </FilteredLogDiv>
        )}
        {currentLogs.map((log) => {
          const title = log?.title;
          const notes = log?.notes;
          const vet = log?.veterinarian;
          const hospital = log?.hospital;
          const symptoms = log?.symptoms;
          const treatment = log?.treatment;
          const medication = log?.medication;
          const dosage = log?.dosage;
          const frequency = log?.frequency;
          return (
            <Link
              key={log.id}
              to={`/healthlogs/${log.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card>
                <CardContainer1>
                  <CardHeader>
                    <CardIcon>{logTypeBlocks[log.log_type]}</CardIcon>
                    <CardHeaderInfo>
                      <LogsDiv>
                        <LogTitle type={log.log_type}>
                          {truncateTitle(title)}
                        </LogTitle>
                        <LogTypeDiv>{logTypeLabels[log.log_type]}</LogTypeDiv>
                      </LogsDiv>
                      <DateDiv>
                        {log.created_at ? <Calendar size={17} /> : ""}
                        {format(log.created_at, "EEE, MMMM d, yyyy")}
                      </DateDiv>
                    </CardHeaderInfo>
                  </CardHeader>
                  <CardInfo>
                    {log.veterinarian ? (
                      <DrInfo>
                        {log.veterinarian ? <UserRound size={17} /> : ""}
                        {truncateInfo(vet)}
                      </DrInfo>
                    ) : (
                      ""
                    )}
                    {log.hospital ? (
                      <HospitalInfo>
                        {log.hospital ? <Hospital size={17} /> : ""}
                        {truncateInfo(hospital)}
                      </HospitalInfo>
                    ) : (
                      ""
                    )}
                    {log.medication ? (
                      <>
                        <MedicationDosage>
                          <Medication>
                            <Pill size={17} />
                            {truncateInfo(medication)}
                          </Medication>
                          <Dosage>
                            <Dot size={23} />
                            {truncateTitle(dosage)}
                          </Dosage>
                          <Frequency>
                            <Dot size={23} />
                            {truncateInfo(frequency)}
                          </Frequency>
                        </MedicationDosage>
                      </>
                    ) : (
                      ""
                    )}
                    {log.symptoms ? (
                      <>
                        <Symptoms>
                          <TriDiv>
                            <TriangleAlert size={17} />
                          </TriDiv>
                          {truncateInfo(symptoms)}
                        </Symptoms>
                        <Treatment>
                          <PillDiv>
                            <PillBottle size={17} />
                          </PillDiv>
                          {truncateInfo(treatment)}
                        </Treatment>
                      </>
                    ) : (
                      ""
                    )}
                    {log.due_date ? (
                      <DueDate type={log.log_type}>
                        Due :
                        <Calendar size={17} />
                        {format(log.due_date, "EEE, MMMM d")}
                      </DueDate>
                    ) : (
                      ""
                    )}
                    {log.weight ? (
                      <>
                        <WeightD>
                          <Weight size={17} />
                          {log.weight} {log.unit}
                        </WeightD>
                      </>
                    ) : (
                      ""
                    )}
                    <NotesText>{truncateNotes(notes)}</NotesText>
                  </CardInfo>
                </CardContainer1>
                <CardActions>
                  <CardButton
                    key={log.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedId((prev) =>
                        prev === log.id ? null : log.id
                      );
                    }}
                  >
                    <Ellipsis size={20} />
                  </CardButton>
                  <AnimatePresence>
                    {selectedId === log.id && (
                      <Dropdown
                        ref={dropdownRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <EditLogButton
                          onClick={(e) => {
                            e.preventDefault();
                            setShowLogModal(true);
                            setLogMode("edit");
                            setEditLog(log);
                            setSelectedId(null);
                          }}
                        >
                          <Pen size={20} />
                          <EditText>Edit Log</EditText>
                        </EditLogButton>
                        <DeleteLogButton
                          disabled={deleteHealthlogs.isPending}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteLog(log.id);
                          }}
                        >
                          {deleteHealthlogs.isPending ? (
                            <SpinnerMini
                              color="#ed4a2f"
                              width="1.4rem"
                              height="1.4rem"
                            />
                          ) : (
                            <>
                              <Trash size={20} />
                              <DeleteText>Delete Log</DeleteText>
                            </>
                          )}
                        </DeleteLogButton>
                      </Dropdown>
                    )}
                  </AnimatePresence>
                </CardActions>
              </Card>
            </Link>
          );
        })}
        {logsToDisplay.length < 11 ? (
          ""
        ) : (
          <NavigationDiv>
            {currentPage === 1 ? (
              ""
            ) : (
              <Navigation1 onClick={handlePrev}>
                <DotIcon size={35} />
              </Navigation1>
            )}
            <Navigation2>
              <DotIcon size={45} />
            </Navigation2>
            {currentPage >= Math.ceil(logsToDisplay.length / logsPerPage) ? (
              ""
            ) : (
              <Navigation3 onClick={handleNext}>
                <DotIcon size={35} />
              </Navigation3>
            )}
          </NavigationDiv>
        )}
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
    font-size: 1rem;
  }
`;
const TriDiv = styled.div``;
const PillDiv = styled.div``;
const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
`;
const CardHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const SecondContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;
const FirstContainer = styled.div`
  margin-top: 35px;
`;
const SecondContainer1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ed4a2f;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;
const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  height: auto;
  overflow: visible;
  position: relative;
  @media (max-width: 767px) {
    padding: 1rem;
  }
`;
const CardContainer1 = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 650px;
  }
`;
const CardIcon = styled.div``;
const CardInfo = styled.div`
  width: 1000px;
  @media (max-width: 767px) {
    width: 260px;
  }
`;
const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  width: 30px;
  justify-content: center;
`;
const CardButton = styled.div`
  border: none;
  height: 30px;
  width: 30px;
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
const CardTitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CardTimeDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.3rem;
`;
const DrInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  gap: 0.3rem;
`;
const MedicationDosage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: normal;
  }
`;
const Medication = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.3rem;
`;
const Dosage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;
const Frequency = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  @media (max-width: 767px) {
    width: 150px;
  }
`;
const SearchIcon = styled(Search)`
  position: absolute;
  left: 10px;
`;
const SearchInput = styled.input`
  border: none;
  background-color: white;
  height: 32px;
  width: 100%;
  font-size: 0.9rem;
  border-radius: 50px;
  font-family: inherit;
  padding: 0 1rem;
  padding-left: 35px;
  caret-color: #ed4a2f;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const HospitalInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  gap: 0.3rem;
`;
const Symptoms = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  gap: 0.3rem;
`;

const Treatment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
  gap: 0.3rem;
`;
const WeightD = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.3rem;
`;
const NotesText = styled.p`
  margin-top: 0.3rem;
  word-break: break-all;
`;
const MostRecent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const AddHealthlogButton = styled.button`
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
  @media (max-width: 767px) {
    padding: 0.7rem;
    font-size: 0.9rem;
    padding-right: 0.9rem;
  }
`;
const LogTypeDiv = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;
const DateDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.3rem;
`;

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
const VaccinationDiv = styled.div`
  color: #3a803e;
  background-color: #dcfbe7;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IllnessDiv = styled.div`
  background-color: #fae2e2;
  color: #ba3523;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MedicationDiv = styled.div`
  background-color: #f3e8fe;
  color: #8044ce;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const VetVisitDiv = styled.div`
  background-color: #dbeafe;
  color: #1d4ed8;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WeightDiv = styled.div`
  background-color: #fdecd5;
  color: #c24225;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OtherDiv = styled.div`
  background-color: #fbe7f3;
  color: #c13e62;
  padding: 0 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Dropdown = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #fffaf4;
  align-self: flex-end;
  width: 160px;
  margin-top: 0.4rem;
`;
const EditLogButton = styled.button`
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
const DeleteLogButton = styled.button`
  border: none;
  padding: 0.8rem 1rem;
  font-family: inherit;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #fffaf4;
  }
`;
const Pen = styled(SquarePen)`
  margin-right: 12px;
`;
const Trash = styled(Trash2)`
  margin-right: 10px;
`;
const EditText = styled.p``;
const DeleteText = styled.p``;
const NavigationDiv = styled.div`
  width: 10%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin-top: 30px;
  padding-bottom: 10px;
`;
const Navigation1 = styled.button`
  color: #ed4a2f;
  background: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 10px;
`;
const Navigation2 = styled.button`
  color: #ed4a2f;
  background: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 10px;
`;
const Navigation3 = styled.button`
  color: #ed4a2f;
  background: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 10px;
`;
const DotIcon = styled(Dot)`
  &:hover {
    cursor: pointer;
  }
`;
const FilteredLogDiv = styled.div`
  background-color: white;
  width: 25%;
  margin: 150px auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  border-radius: 10px;
  font-size: 1.1rem;
  color: #ed4a2f;
  @media (max-width: 767px) {
    width: 70%;
    margin: 100px auto;
  }
`;
export default HealthLogsMainLayout;
