import { useEffect, useContext } from "react";
import {
  Flex,
  Heading,
  chakra,
  useBreakpointValue,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { NoteModal } from "./components/NoteModal";
import { Navbar } from "../../components/Navbar/Navbar";
import { NoteModalSkeleton } from "./components/NoteModalSkeleton";
import { CreatNoteModal } from "../../components/CreateNoteModal";
import { AddNote } from "./components/AddNote";
import { Notes } from "../../context/notes";
import { fetchResponse } from "../../utils/fetchResponse";
import { AuthError } from "../error/AuthError";

const MobileDashboard = ({ notes, buffer, onOpen }) => {
  return (
    <VStack
      w="full"
      align="flex-start"
      justify="flex-start"
      px="1.2rem"
      mt="5rem"
      mb="6rem"
      gap={7}
    >
      <Heading fontSize="1.7rem">Recents</Heading>
      <VStack
        wrap="wrap"
        justify="flex-start"
        align="flex-start"
        w="full"
        gap="2rem"
      >
        {buffer ? (
          <VStack w="full" align="center" gap="2rem">
            <NoteModalSkeleton />
            <NoteModalSkeleton />
            <NoteModalSkeleton />
          </VStack>
        ) : (
          <>
            <AddNote onOpen={onOpen} />
            {notes.map((item) => (
              <NoteModal
                key={item.slug}
                title={item.title}
                description={item.description}
                tags={item.tags}
                slug={item.slug}
              />
            ))}
          </>
        )}
      </VStack>
    </VStack>
  );
};

const DesktopDashboard = ({ notes, buffer, onOpen }) => {
  return (
    <>
      <Flex
        width="full"
        align="flex-start"
        justify="space-between"
        direction="row"
        gap="1.5rem"
        px="3rem"
        py={7}
        pt={1}
        mt="2rem"
      >
        <Heading fontSize="2.5rem">Recents</Heading>
      </Flex>
      <Flex gap={10} w="full" mb="3rem" px="3rem" wrap="wrap">
        {buffer ? (
          <HStack gap={10}>
            <NoteModalSkeleton />
            <NoteModalSkeleton />
          </HStack>
        ) : (
          <>
            {notes.map((item) => (
              <NoteModal
                key={item.slug}
                title={item.title}
                description={item.description}
                tags={item.tags}
                slug={item.slug}
              />
            ))}

            <AddNote onOpen={onOpen} />
          </>
        )}
      </Flex>
    </>
  );
};

export const Dashboard = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { notes, setNotes, buffer, setBuffer } = useContext(Notes);
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    const fetchNotes = async () => {
      setBuffer(true);

      auth == "true"
        ? await fetchResponse("note", "GET")
            .then((res) => (res.error ? null : setNotes(res.result)))
            .then(() => setBuffer(false))
        : null;
    };

    fetchNotes();
  }, []);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return auth === "true" ? (
    <>
      <CreatNoteModal isOpen={isModalOpen} onClose={onModalClose} />
      <chakra.div
        backgroundColor={useColorModeValue("white", "blackAlpha.700")}
        overflowX="hidden"
      >
        <Navbar />
        <Flex
          flexDirection="column"
          justify="flex-start"
          align="center"
          gap={[4, 5, 8]}
          ml={isMobile ? 0 : "5.5rem"}
          px={isMobile ? 0 : "0.5rem"}
          minHeight="100vh"
        >
          {isMobile ? (
            <MobileDashboard
              notes={notes}
              buffer={buffer}
              onOpen={onModalOpen}
            />
          ) : (
            <DesktopDashboard
              notes={notes}
              buffer={buffer}
              onOpen={onModalOpen}
            />
          )}
        </Flex>
      </chakra.div>
    </>
  ) : (
    <AuthError />
  );
};
