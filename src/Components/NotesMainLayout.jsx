import styled from "styled-components";
import { Heading } from "./Heading";
import {
  Calendar,
  Ellipsis,
  Plus,
  Trash2,
  SquarePen,
  Search,
  Dot,
  CircleAlert,
  PawPrint,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import NotesModal from "./NotesModal";
import { useDeleteNotes, useFetchNotes } from "../Hooks/useNotes";
import { format } from "date-fns";
import SpinnerMini from "./SpinnerMini";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";
function NotesMainLayout() {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [noteMode, setNoteMode] = useState("");
  const [search, setSearch] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchNotes = useFetchNotes();
  const deleteNotes = useDeleteNotes();
  const dropdownRef = useRef(null);
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
  if (fetchNotes.isPending) return <Loader />;
  const notesData = fetchNotes?.data;
  function handleDeleteNote(id) {
    deleteNotes.mutate(id);
  }
  console.log(notesData);
  const filteredNotes = notesData.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.notes.toLowerCase().includes(search.toLowerCase())
  );
  const notesToDisplay = search ? filteredNotes : notesData;
  const notesPerPage = 10;
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notesToDisplay.slice(indexOfFirstNote, indexOfLastNote);
  const handlePrev = () => {
    setCurrentPage((p) => Math.max(p - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((p) =>
      p < Math.ceil(notesToDisplay.length / notesPerPage) ? p + 1 : p
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
      <HeaderContainer>
        <Heading as="h5">My Notes</Heading>
        <HeaderText>
          Keep track of important information about your pets
        </HeaderText>
      </HeaderContainer>
      <FirstContainer>
        <AddNotesButton
          onClick={() => {
            setShowNoteModal(true);
            setNoteMode("add");
            setEditNote(null);
          }}
        >
          <Plus size={21} />
          Add Note
        </AddNotesButton>
        <NotesModal
          isOpen={showNoteModal}
          onClose={() => setShowNoteModal(false)}
          mode={noteMode}
          initialData={editNote}
        />
      </FirstContainer>
      <SecondContainer>
        {notesData.length > 0 && (
          <SecondContainer1>
            <Heading as="h9">Note Entries</Heading>
            <MostRecent>
              <InputWrapper>
                <SearchIcon size={15} color="#ed4a2f" />
                <SearchInput
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search notes..."
                />
              </InputWrapper>
            </MostRecent>
          </SecondContainer1>
        )}
        {search && notesData.length > 0 && filteredNotes.length === 0 && (
          <FilteredNotesDiv>
            <CircleAlert />
            No results found
          </FilteredNotesDiv>
        )}
        {currentNotes.map((note) => {
          const notes = note.notes;
          const title = note.title;
          return (
            <Link
              key={note.id}
              to={`/notes/${note.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Card>
                <OrangeDiv></OrangeDiv>
                <CardInfo>
                  <CardDetails>
                    <CardTitle>{truncateTitle(title)}</CardTitle>
                    <CardDate>
                      <Calendar size={17} />
                      {format(note.created_at, "EEE, MMMM d, yyyy")}
                    </CardDate>
                    <CardNotes>{truncateNotes(notes)}</CardNotes>
                  </CardDetails>
                  <CardActions>
                    <CardButton
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedId((prev) =>
                          prev === note.id ? null : note.id
                        );
                      }}
                    >
                      <Ellipsis size={20} />
                    </CardButton>
                    <AnimatePresence>
                      {selectedId === note.id && (
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
                              setShowNoteModal(true);
                              setNoteMode("edit");
                              setEditNote(note);
                              setSelectedId(null);
                            }}
                          >
                            <Pen size={20} />
                            <EditText>Edit Log</EditText>
                          </EditLogButton>
                          <DeleteLogButton
                            disabled={deleteNotes.isPending}
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteNote(note.id);
                            }}
                          >
                            {deleteNotes.isPending ? (
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
                </CardInfo>
              </Card>
            </Link>
          );
        })}
        {notesToDisplay.length < 11 ? (
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
            {currentPage >= Math.ceil(notesToDisplay.length / notesPerPage) ? (
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
const FirstContainer = styled.div`
  margin-top: 35px;
`;
const AddNotesButton = styled.button`
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
  @media (max-width: 1024px) {
    width: 640px;
  }
  @media (max-width: 767px) {
    width: 240px;
  }
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
const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  width: 30px;
`;
const SecondContainer1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ed4a2f;
  padding-bottom: 10px;
  margin-bottom: 15px;
`;
const MostRecent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
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
  font-size: 1rem;
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
const NavigationDiv = styled.div`
  width: 10%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  margin-top: 30px;
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
const FilteredNotesDiv = styled.div`
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
export default NotesMainLayout;
