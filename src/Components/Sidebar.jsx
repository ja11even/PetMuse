import {
  Calendar,
  Heart,
  LayoutDashboard,
  PawPrint,
  NotebookPen,
  UserRound,
  LogOut,
} from "lucide-react";
import styled from "styled-components";
import { useUser } from "../Hooks/useUser";
import { NavLink } from "react-router-dom";
import { useFetchPets } from "../Hooks/usePets";
import { useEffect, useRef, useState } from "react";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";
import { useLogOut } from "../Hooks/useLogOut";
function Sidebar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [openSidebar, _setOpenSidebar] = useState(false);
  const { user } = useUser();
  const { mutate: logOut, isPending } = useLogOut();
  const { pets } = useFetchPets();
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const firstName = user?.user_metadata?.firstName;
  const avatar = user?.user_metadata.avatar_url;
  const handleToast = () => {
    toast("Ooops! You need to add a pet first!");
  };
  return (
    <SidebarContainer openSidebar={openSidebar}>
      <FirstContainer>
        <LogoDiv>
          <PawPrint fill="#ed4a2f" />
          <Logo>PetMuse</Logo>
        </LogoDiv>
      </FirstContainer>
      <SecondContainer>
        {pets?.length === 0 ? (
          <SidebarMenu>
            <LockedSidebarItem
              style={{ backgroundColor: "#fce9d0", color: "#ed4a2f" }}
            >
              <LayoutDashboard color="#ed4a2f" />
              Dashboard
            </LockedSidebarItem>
            <LockedSidebarItem onClick={handleToast}>
              <PawPrint color="#ed4a2f" fill="#ed4a2f" />
              {pets.length > 1 ? "My Pets" : "My Pet"}
            </LockedSidebarItem>
            <LockedSidebarItem onClick={handleToast}>
              <Heart color="#ed4a2f" />
              Health Logs
            </LockedSidebarItem>
            <LockedSidebarItem onClick={handleToast}>
              <Calendar color="#ed4a2f" />
              Appointments
            </LockedSidebarItem>
            <LockedSidebarItem onClick={handleToast}>
              <NotebookPen color="#ed4a2f" />
              My Notes
            </LockedSidebarItem>
            <LockedSidebarItem onClick={handleToast}>
              <UserRound color="#ed4a2f" />
              My Profile
            </LockedSidebarItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            <SidebarItem to="/dashboard">
              <LayoutDashboard color="#ed4a2f" />
              Dashboard
            </SidebarItem>
            <SidebarItem to="/mypets">
              <PawPrint color="#ed4a2f" fill="#ed4a2f" />
              {pets?.length > 1 ? "My Pets" : "My Pet"}
            </SidebarItem>
            <SidebarItem to="/healthlogs">
              <Heart color="#ed4a2f" />
              Health Logs
            </SidebarItem>
            <SidebarItem to="/appointments">
              <Calendar color="#ed4a2f" />
              Appointments
            </SidebarItem>
            <SidebarItem to="/notes">
              <NotebookPen color="#ed4a2f" />
              My Notes
            </SidebarItem>
            <SidebarItem to="/profile">
              <UserRound color="#ed4a2f" />
              My Profile
            </SidebarItem>
          </SidebarMenu>
        )}
      </SecondContainer>
      <ThirdContainer>
        <CharDiv onClick={() => setShowDropdown(!showDropdown)}>
          {avatar ? (
            <Img src={avatar} alt="avatar" />
          ) : (
            <Char>{firstName.charAt(0)}</Char>
          )}
        </CharDiv>
        <NameDiv>
          <UserName>{firstName}</UserName>
          <Email>{user.email}</Email>
        </NameDiv>
        {showDropdown && (
          <LogOutButton ref={buttonRef} onClick={logOut} disabled={isPending}>
            {isPending ? (
              <SpinnerMini width="1.7rem" height="1.7rem" color="white" />
            ) : (
              <>
                Log Out
                <LogOut size={20} />
              </>
            )}
          </LogOutButton>
        )}
      </ThirdContainer>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  top: 0;
  bottom: 0;
  align-self: flex-start;
  @media (max-width: 1024px) {
    left: ${({ openSidebar }) => (openSidebar ? "0" : "0")};
    transition: left 0.3s ease;
  }
  @media (max-width: 767px) {
    left: ${({ openSidebar }) => (openSidebar ? "0" : "0")};
    transition: left 0.3s ease;
    position: fixed;
  }
`;
const FirstContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const SecondContainer = styled.div`
  flex: 8;
  border-top: 1px solid #ed4a2f;
  border-bottom: 1px solid#ed4a2f;
`;
const ThirdContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  position: relative;
`;
const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ed4a2f;
`;
const Logo = styled.p`
  font-size: 1.2rem;
  color: #ed4a2f;
`;
const SidebarMenu = styled.ul`
  margin-left: 10px;
  list-style: none;
  padding-top: 20px;
`;
const SidebarItem = styled(NavLink)`
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  width: 95%;
  align-items: center;
  gap: 0.5rem;
  padding-left: 10px;
  border-radius: 5px;
  height: 48px;
  font-size: 1.1rem;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: #fce9d0;
    cursor: pointer;
  }
  &.active {
    background-color: #fce9d0;
    color: #ed4a2f;
  }
  @media (max-width: 1024px) {
    &.active {
      background: transparent;
    }
    &:hover {
      background-color: transparent;
    }
  }
  @media (max-width: 767px) {
    &.active {
      background: transparent;
    }
    &:hover {
      background-color: transparent;
    }
  }
`;
const LockedSidebarItem = styled.li`
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  width: 95%;
  align-items: center;
  gap: 0.5rem;
  padding-left: 10px;
  border-radius: 5px;
  height: 48px;
  font-size: 1.1rem;
  text-decoration: none;
  color: black;
  &:hover {
    cursor: not-allowed;
  }
`;
const CharDiv = styled.div`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #fce9d0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50%;
  object-fit: cover;
`;
const NameDiv = styled.div`
  line-height: 1.4;
  width: 70%;
`;
const UserName = styled.p`
  color: #ed4a2f;
  word-break: break-all;
`;
const Email = styled.p`
  border-top: 1px solid #ed4a2f;
  word-break: break-all;
`;
const Char = styled.h2`
  color: #ed4a2f;
`;

const LogOutButton = styled.button`
  border: none;
  font-family: inherit;
  border-radius: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #ed4a2f;
  width: 140px;
  bottom: 70px;
  height: 45px;
  left: 40px;
  padding: 0.8rem 0rem;
  position: absolute;
  gap: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: #ed4a2f;
  }
`;

export default Sidebar;
