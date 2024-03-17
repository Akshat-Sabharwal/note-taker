import {
  Card,
  Flex,
  IconButton,
  Tag,
  Heading,
  Text,
  chakra,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { NotesData } from "../../../context/notesContext";

export const NoteModal = ({ heading, description, tag }) => {
  const navigate = useNavigate();
  const { notesData, setNotesData } = useContext(NotesData);
  const note = notesData.find((item) => item.heading === heading);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isInvalid, setIsInvalid] = useState({
    heading: false,
    description: false,
    tag: false,
  });
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    tag: "",
  });

  const editNote = (e) => {
    e.preventDefault();
    if (
      isInvalid.heading == true ||
      isInvalid.description == true ||
      isInvalid.tag == true ||
      formData.heading === "" ||
      formData.description === "" ||
      formData.tag === ""
    ) {
      toast({
        title: "Form Invalid!",
        description: "The note information must contain a letter each",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      note.heading = formData.heading;
      note.description = formData.description;
      note.tag = formData.tag;

      setNotesData([
        ...notesData.slice(0, notesData.indexOf(note)),
        note,
        ...notesData.slice(notesData.indexOf(note), -1),
      ]);
    }
    setFormData({ heading: "", description: "", tag: "" });
  };

  const deleteNote = () => {
    setNotesData([
      ...notesData.slice(0, notesData.indexOf(note)),
      ...notesData.slice(notesData.indexOf(note), -1),
    ]);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue("white", "#191a1c")}
          px={2}
          py={2}
          pb={5}
        >
          <ModalHeader fontSize="2rem">Rename the Note</ModalHeader>
          <ModalCloseButton onClick={onClose} mt={5} mr={3} />
          <ModalBody>
            <Flex
              width="full"
              direction="column"
              justify="flex-start"
              align="flex-start"
              gap={10}
            >
              <Flex
                width="full"
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={3}
              >
                <FormControl isInvalid={isInvalid.heading}>
                  <FormLabel>Label for the note</FormLabel>
                  <Input
                    type="text"
                    placeholder="Grocery list"
                    width="full"
                    value={formData.heading}
                    onChange={(e) => {
                      setFormData({ ...formData, heading: e.target.value });
                      setIsInvalid({
                        ...isInvalid,
                        heading: e.target.value === "" ? true : false,
                      });
                    }}
                  />
                  {isInvalid.heading && (
                    <FormErrorMessage>
                      The label must contain atleast a character
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isInvalid.description}>
                  <FormLabel>Description for the note</FormLabel>
                  <Input
                    type="text"
                    placeholder="All of it to be bought by tomorrow "
                    width="full"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value });
                      setIsInvalid({
                        ...isInvalid,
                        description: e.target.value === "" ? true : false,
                      });
                    }}
                  />
                  {isInvalid.description && (
                    <FormErrorMessage>
                      The description must contain atleast a character
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isInvalid.tag}>
                  <FormLabel>Tag for the note</FormLabel>
                  <Input
                    type="text"
                    placeholder="Basic Needs"
                    width="full"
                    value={formData.tag}
                    onChange={(e) => {
                      setFormData({ ...formData, tag: e.target.value });
                      setIsInvalid({
                        ...isInvalid,
                        tag: e.target.value === "" ? true : false,
                      });
                    }}
                  />
                  {isInvalid.tag && (
                    <FormErrorMessage>
                      The tag must contain atleast a character
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Button
                width="full"
                backgroundColor={useColorModeValue(
                  "blackAlpha.800",
                  "whiteAlpha.200"
                )}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.900",
                    "whiteAlpha.100"
                  ),
                }}
                color="white"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    editNote(e);
                    onClose();
                  } else {
                    null;
                  }
                }}
                onClick={(e) => {
                  editNote(e);
                  onClose();
                }}
              >
                Rename
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Card
        pl={7}
        pr={4}
        pt={5}
        pb={6}
        gap={2}
        boxShadow="md"
        maxWidth="35rem"
        backgroundColor={useColorModeValue("white", "whiteAlpha.200")}
      >
        <Flex
          gap={10}
          justify="space-between"
          align="flex-start"
          flexDirection="row"
        >
          <Flex
            direction="column"
            justify="flex-start"
            align="flex-start"
            gap={5}
            cursor="pointer"
            onClick={() => {
              try {
                navigate(`/dashboard/${note.heading}`);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <chakra.span>
              <Heading mb={1} fontSize={["1.6rem", "1.8rem", "2rem"]}>
                {heading}
              </Heading>
              <Text
                fontSize={["0.9rem", "1rem", "1.1rem"]}
                color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                maxWidth={{
                  base: "20ch",
                  sm: "25ch",
                  md: "28ch",
                  lg: "30ch",
                  xl: "30ch",
                }}
              >
                {description}
              </Text>
            </chakra.span>
            <Tag
              width="fit-content"
              px={2}
              py={1}
              fontSize="1rem"
              backgroundColor={useColorModeValue(
                "blackAlpha.800",
                "blackAlpha.600"
              )}
              color={useColorModeValue("white", "blackAlpha")}
            >
              {tag}
            </Tag>
          </Flex>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaEllipsisVertical />}
              p={3}
              maxWidth="3rem"
              size="lg"
              fontSize="1.7rem"
              variant="ghost"
              _hover={{
                backgroundColor: useColorModeValue(
                  "blackAlpha.300",
                  "whiteAlpha.300"
                ),
              }}
              _active={{
                backgroundColor: useColorModeValue(
                  "blackAlpha.300",
                  "whiteAlpha.300"
                ),
              }}
            />
            <MenuList backgroundColor={useColorModeValue("white", "black")}>
              <MenuItem
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.200",
                    "whiteAlpha.200"
                  ),
                }}
                backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                onClick={() => navigate(`/dashboard/${note.heading}`)}
              >
                Edit
              </MenuItem>
              <MenuItem
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.200",
                    "whiteAlpha.200"
                  ),
                }}
                backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                onClick={onOpen}
              >
                Rename
              </MenuItem>
              <MenuItem
                color="red.400"
                backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.200",
                    "whiteAlpha.200"
                  ),
                }}
                onClick={deleteNote}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Card>
    </>
  );
};
