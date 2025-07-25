import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../Services/Supabase";
import styled from "styled-components";
import {
  Calendar,
  ChevronLeft,
  Clock,
  Dot,
  Heart,
  Hospital,
  PawPrint,
  Pill,
  PillBottle,
  Stethoscope,
  Syringe,
  TriangleAlert,
  UserRound,
  Weight,
} from "lucide-react";
import { Heading } from "../Components/Heading";
import { format } from "date-fns";
import Loader from "./Loader";

const logTypeColors = {
  vaccination: "#3a803e",
  illnesssymptoms: "#ba3523",
  medication: "#8044ce",
  vetvisit: "#1d4ed8",
  weightcheck: "#c24225",
  other: "#c13e62",
};
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
function LogDetailMainLayout() {
  const { logId } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchLog() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Healthlogs")
        .select("*")
        .eq("id", logId)
        .single();
      if (!error) setLog(data);
      setLoading(false);
    }
    fetchLog();
  }, [logId]);
  if (loading) return <Loader />;
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
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <HeaderContainer>
        <Heading as="h5">Log Details</Heading>
        <HeaderText>View the full details of this health log entry</HeaderText>
      </HeaderContainer>
      <FirstContainer>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          View Logs
        </BackButton>
      </FirstContainer>
      <SecondContainer>
        <Card>
          <CardContainer1>
            <CardHeader>
              <CardIcon>{logTypeBlocks[log?.log_type]}</CardIcon>
              <CardHeaderInfo>
                <LogsDiv>
                  <LogTitle type={log?.log_type}>{log?.title}</LogTitle>
                  <LogTypeDiv>{logTypeLabels[log?.log_type]}</LogTypeDiv>
                </LogsDiv>
                <DateDiv>
                  {log?.created_at ? <Calendar size={17} /> : ""}
                  {log?.created_at &&
                    format(log?.created_at, "EEE, MMMM d, yyyy")}
                </DateDiv>
              </CardHeaderInfo>
            </CardHeader>
            <CardInfo>
              <CardTimeDiv>
                <TimeDiv>
                  {log?.time ? <Clock size={17} /> : ""}
                  {log?.time}
                </TimeDiv>
              </CardTimeDiv>
              {log?.veterinarian ? (
                <DrInfo>
                  {log?.veterinarian ? <UserRound size={17} /> : ""}
                  {log?.veterinarian}
                </DrInfo>
              ) : (
                ""
              )}
              {log?.hospital ? (
                <HospitalInfo>
                  {log?.hospital ? <Hospital size={17} /> : ""}
                  {log?.hospital}
                </HospitalInfo>
              ) : (
                ""
              )}
              {log?.medication ? (
                <>
                  <MedicationDosage>
                    <Medication>
                      <Pill size={17} />
                      {log?.medication}
                    </Medication>
                    <Dosage>
                      <Dot size={23} />
                      {log?.dosage}
                    </Dosage>
                    <Frequency>
                      <Dot size={23} />
                      {log?.frequency}
                    </Frequency>
                  </MedicationDosage>
                </>
              ) : (
                ""
              )}
              {log?.symptoms ? (
                <>
                  <Symptoms>
                    <TriDiv>
                      <TriangleAlert size={17} />
                    </TriDiv>
                    {log?.symptoms}
                  </Symptoms>
                  <Treatment>
                    <PillDiv>
                      <PillBottle size={17} />
                    </PillDiv>
                    {log?.treatment}
                  </Treatment>
                </>
              ) : (
                ""
              )}
              {log?.due_date ? (
                <DueDate type={log?.log_type}>
                  Next :
                  <Calendar size={17} />
                  {format(log?.due_date, "EEE, MMMM d")}
                </DueDate>
              ) : (
                ""
              )}
              {log?.weight ? (
                <>
                  <WeightD>
                    <Weight size={17} />
                    {log?.weight} {log?.unit}
                  </WeightD>
                </>
              ) : (
                ""
              )}
              <NotesText>{log?.notes}</NotesText>
            </CardInfo>
          </CardContainer1>
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
`;
const CardContainer1 = styled.div`
  display: flex;
  gap: 0.7rem;
  flex-direction: column;
`;
const CardIcon = styled.div`
  height: fit-content;
`;
const CardInfo = styled.div`
  width: 1020px;

  @media (max-width: 767px) {
    width: 280px;
  }
`;
const LogsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const CardTimeDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.3rem;
  @media (max-width: 767px) {
    align-items: normal;
    flex-direction: column;
    margin-top: 0rem;
  }
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
    align-items: normal;
    flex-direction: column;
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
  @media (max-width: 767px) {
    margin-top: 0rem;
  }
`;
const TriDiv = styled.div``;
const PillDiv = styled.div``;
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
const TimeDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.3rem;
`;

const CardHeader = styled.div`
  display: flex;
  gap: 1rem;
`;
const CardHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
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
const SecondContainer = styled.div`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
`;
export default LogDetailMainLayout;
