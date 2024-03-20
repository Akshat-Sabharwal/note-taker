import {
  Flex,
  Heading,
  Button,
  IconButton,
  chakra,
  useColorMode,
  useColorModeValue,
  theme,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Input,
  FormControl,
  ModalContent,
  FormLabel,
  FormErrorMessage,
  useToast,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
} from "@chakra-ui/react";
import {
  IoCreateOutline,
  IoHomeOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { RiMenu5Line } from "react-icons/ri";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import { NotesData, NotesDataProvider } from "../context/notesContext";

export const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { toggleColorMode } = useColorMode(theme);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const toast = useToast();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
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
  const { notesData, setNotesData } = useContext(NotesData);

  const addNoteToContext = (e) => {
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
      setNotesData([...notesData, { ...formData, content: "" }]);
    }
    setFormData({ heading: "", description: "", tag: "" });
  };

  return (
    <NotesDataProvider>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue("white", "#191a1c")}
          px={2}
          py={2}
          pb={5}
          maxWidth={isMobile ? "85vw" : "30rem"}
        >
          <ModalHeader fontSize={isMobile ? "1.7rem" : "2rem"}>
            Create a Note
          </ModalHeader>
          <ModalCloseButton onClick={onModalClose} mt={5} mr={3} />
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
                gap={5}
              >
                <FormControl isInvalid={isInvalid.heading}>
                  <FormLabel>Label for the note</FormLabel>
                  <Input
                    type="text"
                    placeholder="Grocery list"
                    width="full"
                    maxLength={30}
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
                      The label character length must be between 1-30
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isInvalid.description}>
                  <FormLabel>Description for the note</FormLabel>
                  <Input
                    type="text"
                    placeholder="All of it to be bought by tomorrow "
                    width="full"
                    maxLength={40}
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
                      The description character length must be between 1-40
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
                    maxLength={20}
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
                      The tag character length must be between 1-20
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
                    addNoteToContext(e);
                    onModalClose();
                  } else {
                    null;
                  }
                }}
                onClick={(e) => {
                  addNoteToContext(e);
                  onModalClose();
                }}
              >
                Create
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isMobile ? (
        <>
          <Flex
            w="full"
            justify="space-between"
            align="center"
            px={[4, 8, 10]}
            pr={[2, 6, 10]}
            py={[3, 4, 8]}
            backdropFilter="auto"
            backdropBlur="0.5rem"
            position="fixed"
            boxShadow={useColorModeValue("md", "dark")}
            zIndex="10"
          >
            <Heading fontSize={["1.8rem", "2.4rem", "2.8rem"]}>Noteum</Heading>
            <Flex justify="flex-start" align="center" gap={[1, 5, 6]}>
              <IconButton
                icon={useColorModeValue(<IoSunnyOutline />, <IoMoonOutline />)}
                onClick={toggleColorMode}
                size="lg"
                fontSize="2.2rem"
                variant="ghost"
                p={1}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
              <IconButton
                icon={<RiMenu5Line />}
                fontSize="2rem"
                size="lg"
                variant="ghost"
                ref={menuRef}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
                onClick={onDrawerOpen}
              />
            </Flex>
            <Drawer
              isOpen={isDrawerOpen}
              onClose={onDrawerClose}
              finalFocusRef={menuRef}
              placement="right"
            >
              <DrawerOverlay />
              <DrawerContent
                maxWidth="17rem"
                backgroundColor={useColorModeValue("#ffffff", "#171717")}
                pb={3}
              >
                <DrawerHeader fontSize="3xl" mt={-1}>
                  Noteum
                </DrawerHeader>
                <DrawerBody>
                  <Flex
                    direction="column"
                    justify="space-between"
                    align="flex-start"
                    width="full"
                    height="full"
                    pt={2}
                    gap={10}
                  >
                    <Flex
                      direction="column"
                      justify="space-evenly"
                      align="flex-start"
                      gap={3}
                    >
                      <Button
                        leftIcon={<IoCreateOutline />}
                        onClick={() => {
                          onModalOpen();
                          onDrawerClose();
                        }}
                        size="lg"
                        fontSize="2rem"
                        pl={2}
                        gap="0.5rem"
                        width="full"
                        justifyContent="flex-start"
                        variant="ghost"
                        _hover={{
                          backgroundColor: useColorModeValue(
                            "blackAlpha.300",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        <Text fontSize="1.35rem">Create Note</Text>
                      </Button>
                      <Button
                        leftIcon={<IoHomeOutline />}
                        onClick={() => navigate("/")}
                        size="lg"
                        fontSize="1.8rem"
                        pl={2}
                        gap="0.7rem"
                        width="full"
                        justifyContent="flex-start"
                        variant="ghost"
                        _hover={{
                          backgroundColor: useColorModeValue(
                            "blackAlpha.300",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        <Text fontSize="1.35rem">Home</Text>
                      </Button>
                      <Button
                        leftIcon={<IoIosReturnLeft />}
                        onClick={() => navigate(-1)}
                        size="lg"
                        fontSize="2rem"
                        pl={2}
                        gap="0.5rem"
                        width="full"
                        justifyContent="flex-start"
                        variant="ghost"
                        _hover={{
                          backgroundColor: useColorModeValue(
                            "blackAlpha.300",
                            "whiteAlpha.300"
                          ),
                        }}
                      >
                        <Text fontSize="1.35rem">Return</Text>
                      </Button>
                    </Flex>
                    <Button
                      leftIcon={useColorModeValue(
                        <IoSunnyOutline />,
                        <IoMoonOutline />
                      )}
                      onClick={toggleColorMode}
                      size="lg"
                      fontSize="1.9rem"
                      pl={2}
                      gap="0.5rem"
                      width="full"
                      justifyContent="flex-start"
                      variant="ghost"
                      _hover={{
                        backgroundColor: useColorModeValue(
                          "blackAlpha.300",
                          "whiteAlpha.300"
                        ),
                      }}
                    >
                      <Text fontSize="1.35rem">Switch Theme</Text>
                    </Button>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>
        </>
      ) : (
        <>
          <Flex
            flexDirection="column"
            justify="flex-start"
            align={navbarIsOpen ? "flex-start" : "center"}
            px={5}
            pr={navbarIsOpen ? 8 : 5}
            py={6}
            gap="3.5rem"
            width={navbarIsOpen ? "18rem" : "6rem"}
            height="100%"
            backdropFilter="auto"
            backdropBlur="0.5rem"
            position="fixed"
            boxShadow="md"
            zIndex="10"
          >
            <chakra.span display="flex" flexDirection="row" gap="0.7rem">
              <IconButton
                icon={<RiMenu5Line />}
                size="lg"
                fontSize="2rem"
                variant="ghost"
                onClick={() => setNavbarIsOpen(!navbarIsOpen)}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
              {navbarIsOpen ? <Heading>Noteum</Heading> : null}
            </chakra.span>
            <Flex
              justify="space-between"
              align={navbarIsOpen ? "flex-start" : "center"}
              direction="column"
              height="full"
              width="full"
              gap="3rem"
              pb={2}
            >
              <Flex
                flexDirection="column"
                justify="flex-start"
                variant="ghost"
                height="full"
                width="full"
                gap={5}
              >
                {navbarIsOpen ? (
                  <Button
                    leftIcon={<IoCreateOutline />}
                    size="lg"
                    fontSize="2rem"
                    pl={3}
                    gap="0.5rem"
                    width="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    onClick={() => onModalOpen()}
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  >
                    <Text fontSize="1.35rem">Create note</Text>
                  </Button>
                ) : (
                  <IconButton
                    icon={<IoCreateOutline />}
                    onClick={() => onModalOpen()}
                    size="lg"
                    fontSize="2rem"
                    variant="ghost"
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  />
                )}
                {navbarIsOpen ? (
                  <Button
                    leftIcon={<IoHomeOutline />}
                    onClick={() => navigate("/")}
                    size="lg"
                    fontSize="1.8rem"
                    pl={3}
                    gap="0.8rem"
                    width="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  >
                    <Text fontSize="1.35rem">Home</Text>
                  </Button>
                ) : (
                  <IconButton
                    icon={<IoHomeOutline />}
                    onClick={() => navigate("/")}
                    size="lg"
                    fontSize="1.8rem"
                    variant="ghost"
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  />
                )}

                {navbarIsOpen ? (
                  <Button
                    leftIcon={<IoIosReturnLeft />}
                    onClick={() => navigate(-1)}
                    size="lg"
                    fontSize="2.1rem"
                    pl={2}
                    gap="0.7rem"
                    width="full"
                    justifyContent="flex-start"
                    variant="ghost"
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  >
                    <Text fontSize="1.35rem">Return</Text>
                  </Button>
                ) : (
                  <IconButton
                    icon={<IoIosReturnLeft />}
                    onClick={() => navigate(-1)}
                    size="lg"
                    fontSize="2rem"
                    variant="ghost"
                    _hover={{
                      backgroundColor: useColorModeValue(
                        "blackAlpha.300",
                        "whiteAlpha.300"
                      ),
                    }}
                  />
                )}
              </Flex>
              {navbarIsOpen ? (
                <Button
                  leftIcon={useColorModeValue(
                    <IoSunnyOutline />,
                    <IoMoonOutline />
                  )}
                  size="lg"
                  fontSize="2rem"
                  py={6}
                  pl={3}
                  gap="0.5rem"
                  width="full"
                  justifyContent="flex-start"
                  variant="ghost"
                  onClick={toggleColorMode}
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.300",
                      "whiteAlpha.300"
                    ),
                  }}
                >
                  <Text fontSize="1.3rem">Switch Theme</Text>
                </Button>
              ) : (
                <IconButton
                  icon={useColorModeValue(
                    <IoSunnyOutline />,
                    <IoMoonOutline />
                  )}
                  onClick={toggleColorMode}
                  size="xl"
                  fontSize="2.1rem"
                  variant="ghost"
                  p={2}
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.300",
                      "whiteAlpha.300"
                    ),
                  }}
                />
              )}
            </Flex>
          </Flex>
        </>
      )}
    </NotesDataProvider>
  );
};
