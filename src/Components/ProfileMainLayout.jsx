import styled from "styled-components";
import { Heading } from "./Heading";
import { Camera, Database, PawPrint, UserRound } from "lucide-react";
import { useState } from "react";
import { useFetchPets } from "../Hooks/usePets";
import { useFetchAllHealthlogs } from "../Hooks/useHealthlogs";
import { useFetchAllAppointments } from "../Hooks/useAppointments";
import { useUser } from "../Hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../Services/Supabase";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchAllNotes } from "../Hooks/useNotes";
import Loader from "./Loader";

function ProfileMainLayout() {
  const queryClient = useQueryClient();
  const [showaccount, setShowAccount] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { pets, isLoadingPets } = useFetchPets();
  const { user, isLoadingUser } = useUser();
  const AllAppointments = useFetchAllAppointments();
  const AllNotes = useFetchAllNotes();
  const AllHealthlogs = useFetchAllHealthlogs();
  const isLoading =
    isLoadingUser ||
    isLoadingPets ||
    AllAppointments.isLoading ||
    AllHealthlogs.isLoading ||
    AllNotes.isLoading;
  if (isLoading) return <Loader />;

  const userChar = user.user_metadata.firstName.charAt(0);
  const avatarUrl = user.user_metadata.avatar_url;
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${uuidv4()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      if (user.user_metadata.avatar_url) {
        try {
          const oldUrl = user.user_metadata.avatar_url;
          const oldFileNameMatch = oldUrl.match(/\/avatars\/(.+?)(\?.*)?$/);
          if (oldFileNameMatch && oldFileNameMatch[1]) {
            const oldFilePathToDelete = `avatars/${oldFileNameMatch[1]}`;
            const { error: deleteError } = await supabase.storage
              .from("avatars")
              .remove([oldFilePathToDelete]);
            if (deleteError) console.log(deleteError.message);
          }
        } catch (deleteErr) {
          console.log(deleteErr.message);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const cachedUrl = `${publicUrl}?${Date.now()}`;

      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: cachedUrl },
      });
      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Avatar uploaded");
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };
  return (
    <MainLayoutContainer openSidebar={openSidebar}>
      <SidebarIcon onClick={() => setOpenSidebar(!openSidebar)}>
        <PawPrint color="#ed4a2f" fill="#ed4a2f" />
      </SidebarIcon>
      <HeaderContainer>
        <Heading as="h5">My Profile</Heading>
        <HeaderText>
          Manage your account preferences and app settings
        </HeaderText>
      </HeaderContainer>
      <FirstContainer showaccount={showaccount}>
        <NavContainer>
          <ProfileButton
            showaccount={!showaccount}
            onClick={() => setShowAccount(false)}
          >
            <UserRound size={20} />
            Profile
          </ProfileButton>
          <AccountButton
            showaccount={showaccount}
            onClick={() => setShowAccount(true)}
          >
            <Database size={20} />
            Account
          </AccountButton>
        </NavContainer>
        {showaccount ? (
          <AccountCard>
            <AccountStatistics>
              <AccountStatisticsHeader>
                <StatisticsHeader>
                  <Heading as="h4">Account Statistics</Heading>
                </StatisticsHeader>
                <AccountHeaderText>
                  Overview of your account data and usage
                </AccountHeaderText>
              </AccountStatisticsHeader>
              <StatsBoxes>
                <PetBox>
                  <PetCount>{pets.length}</PetCount>
                  <Pet>{pets.length > 1 ? "Pets" : "Pet"}</Pet>
                </PetBox>
                <HealthBox>
                  <HealthCount>{AllHealthlogs.data.length}</HealthCount>
                  <Health>
                    {AllHealthlogs.data.length > 1
                      ? "Health Logs"
                      : "Health Log"}
                  </Health>
                </HealthBox>
                <AppointmentBox>
                  <AppointmentCount>
                    {AllAppointments.data.length}
                  </AppointmentCount>
                  <Appointment>
                    {AllAppointments.data.length > 1
                      ? "Appointments"
                      : "Appointment"}
                  </Appointment>
                </AppointmentBox>
                <NoteBox>
                  <NoteCount>{AllNotes.data.length}</NoteCount>
                  <Note>{AllNotes.data.length > 1 ? "Notes" : "Note"}</Note>
                </NoteBox>
              </StatsBoxes>
            </AccountStatistics>
          </AccountCard>
        ) : (
          <ProfileCard>
            <ProfileHeader>
              <Heading as="h4">Profile Information</Heading>
              <ProfileHeaderText>
                Update your personal information and profile settings
              </ProfileHeaderText>
            </ProfileHeader>
            <Form>
              <AvatarDiv>
                {avatarUrl ? (
                  <Img src={avatarUrl} alt="useravatar" />
                ) : (
                  <UserImageDiv>{userChar}</UserImageDiv>
                )}
                <AvatarLabel htmlFor="avatar">
                  {uploading ? (
                    <SpinnerMini width="1.6rem" height="1.6rem" color="white" />
                  ) : (
                    <>
                      <Camera size={20} />
                      {avatarUrl ? "Change Avatar" : "Upload Avatar"}
                    </>
                  )}
                </AvatarLabel>
                <HiddenInput
                  type="file"
                  accept="image/*"
                  id="avatar"
                  onChange={handleFileChange}
                />
              </AvatarDiv>
              <NamesDiv>
                <FirstNameDiv>
                  <Label>First Name</Label>
                  <Input readOnly value={user.user_metadata.firstName} />
                </FirstNameDiv>
                <LastNameDiv>
                  <Label>Last Name</Label>
                  <Input readOnly value={user.user_metadata.lastName} />
                </LastNameDiv>
              </NamesDiv>
              <EmailDiv>
                <Label>Email address</Label>
                <Input readOnly value={user.user_metadata.email} />
              </EmailDiv>
              <LocationDiv>
                <Label>Location</Label>
                <Input
                  readOnly
                  value={`${user.user_metadata.city}, ${user.user_metadata.country}`}
                />
              </LocationDiv>
            </Form>
          </ProfileCard>
        )}
      </FirstContainer>
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
const FirstContainer = styled.div`
  width: ${(props) => (props.showaccount ? "80%" : "50%")};
  max-width: auto;
  margin: 0 auto;
  margin-top: 50px;
  transition: 0.3s ease;
  @media (max-width: 1024px) {
    width: ${(props) => (props.showaccount ? "100%" : "100%")};
  }
  @media (max-width: 767px) {
    width: ${(props) => (props.showaccount ? "100%" : "100%")};
  }
`;
const NavContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 0.2rem;
  padding: 0.3rem;
  border-radius: 5px;
`;
const ProfileButton = styled.button`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: inherit;
  border: none;
  font-size: 1rem;
  padding: 0.7rem;
  border-radius: 5px;
  color: ${(props) => (props.showaccount ? "#ffffff" : "#ed4a2f")};
  background-color: ${(props) => (props.showaccount ? "#ed4a2f" : "#fffaf4")};
  &:hover {
    cursor: pointer;
  }
`;
const AccountButton = styled.button`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: inherit;
  border: none;
  font-size: 1rem;
  padding: 0.7rem;
  border-radius: 5px;
  color: ${(props) => (props.showaccount ? "#ffffff" : "#ed4a2f ")};
  background-color: ${(props) => (props.showaccount ? "#ed4a2f" : "#fffaf4")};
  &:hover {
    cursor: pointer;
  }
`;
const ProfileCard = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 10px;
  padding-left: 2rem;
  padding-right: 2rem;
  @media (max-width: 767px) {
    padding: 1.3rem;
  }
`;
const ProfileHeader = styled.div`
  line-height: 1.4;
`;
const ProfileHeaderText = styled.p``;
const Form = styled.form``;
const AvatarDiv = styled.div`
  border-bottom: 1px solid #ed4a2f;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 20px;
  padding-bottom: 1rem;
  @media (max-width: 767px) {
    font-size: 1.05rem;
  }
`;
const UserImageDiv = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #fffaf4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #ed4a2f;
`;
const Img = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
`;
const NamesDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  margin-top: 30px;
  @media (max-width: 767px) {
    gap: 0.5rem;
  }
`;
const FirstNameDiv = styled.div`
  width: 50%;
`;
const LastNameDiv = styled.div`
  width: 50%;
`;
const EmailDiv = styled.div`
  margin-top: 20px;
`;
const LocationDiv = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
`;
const AccountCard = styled.div`
  width: 100%;
  margin-top: 30px;
  padding: 1.5rem;
  background-color: white;
  border-radius: 10px;
  @media (max-width: 767px) {
    padding: 1.3rem;
  }
`;
const AccountHeader = styled.div`
  line-height: 1.4;
`;
const AccountHeaderText = styled.p`
  @media (max-width: 767px) {
  }
`;
const AccountStatistics = styled.div`
  border-radius: 10px;
  padding-bottom: 0.2rem;
`;
const AccountStatisticsHeader = styled.div`
  line-height: 1.4;
`;
const StatisticsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StatsBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 30px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    gap: 20px;
  }
`;
const PetCount = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #1d4ed8;
`;
const Pet = styled.p`
  font-size: 1rem;
  color: #1d4ed8;
`;
const HealthCount = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #3a803e;
`;
const Health = styled.p`
  font-size: 1rem;
  color: #3a803e;
`;
const AppointmentCount = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #8044ce;
`;
const Appointment = styled.p`
  font-size: 1rem;
  color: #8044ce;
`;
const NoteCount = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #c13e62;
`;
const Note = styled.p`
  font-size: 1rem;
  color: #c13e62;
`;
const PetBox = styled.div`
  width: 23%;
  height: 100px;
  background-color: #dbeafe;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 46%;
  }
`;
const HealthBox = styled.div`
  width: 23%;
  height: 100px;
  background-color: #dcfbe7;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 46%;
  }
`;
const AppointmentBox = styled.div`
  width: 23%;
  height: 100px;
  background-color: #f3e8fe;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 46%;
  }
`;
const NoteBox = styled.div`
  width: 23%;
  height: 100px;
  background-color: #fbe7f3;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    width: 46%;
  }
`;

const Label = styled.label`
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  padding: 0.6rem;
  border: 1px solid #ed4a2f;
  font-size: 1rem;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-family: inherit;
  }
`;
const HiddenInput = styled.input`
  display: none;
`;
const AvatarLabel = styled.label`
  height: fit-content;
  font-family: inherit;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  gap: 0.5rem;
  border-radius: 5px;
  padding: 0.8rem;
  background-color: #ed4a2f;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
export default ProfileMainLayout;
