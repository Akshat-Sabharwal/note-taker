import {
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  Input,
  FormControl,
  ModalContent,
  FormErrorMessage,
  Tag,
  Flex,
  Button,
  TagLabel,
  TagCloseButton,
  useToast,
  VStack,
  HStack,
  Kbd,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { fetchResponse } from "../utils/fetchResponse";
import { useContext, useState } from "react";
import { Notes } from "../context/notes";

export const CreatNoteModal = ({ isOpen, onClose }) => {
  const toast = useToast({ duration: 3000, isClosable: true });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const initialForm = {
    title: "",
    description: "",
    tags: [],
    currentTag: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [buffer, setBuffer] = useState(false);

  const [isInvalid, setIsInvalid] = useState({
    title: false,
    tags: formData.tags.length >= 5,
  });

  const { setNotes } = useContext(Notes);

  const createNote = async () => {
    if (formData.title === "") {
      toast({
        title: "Invalid Title",
        description: "A note must have a title!",
        status: "error",
      });
    } else {
      const noteData = { ...formData };

      setFormData(initialForm);
      setBuffer(true);

      await fetchResponse("note", "POST", {
        title: noteData.title,
        description: noteData.description,
        tags: [...new Set(noteData.tags)],
      }).then((res) => {
        if (res.error) {
          toast({
            title: res.error.name,
            description: res.error.message,
            status: "error",
          });
        }
      });

      await fetchResponse("note", "GET").then((res) => {
        if (res.error) {
          toast({
            title: res.error.name,
            description: res.error.message,
            status: "error",
          });
        } else {
          setNotes(res.result);
        }
      });
    }

    setBuffer(false);
    onClose();
  };

  const validateTags = (e) => {
    const tag = e.target.value;

    tag.endsWith(" ")
      ? tag.trim() !== ""
        ? formData.tags.length < 5
          ? setFormData({
              ...formData,
              tags: [...formData.tags, tag],
              currentTag: "",
            })
          : setIsInvalid({ ...isInvalid, tags: true })
        : null
      : setFormData({ ...formData, currentTag: tag });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        backgroundColor={useColorModeValue("white", "#191a1c")}
        px={2}
        pb={5}
        maxWidth={isMobile ? "85vw" : "30rem"}
      >
        <ModalHeader fontSize={isMobile ? "1.7rem" : "2rem"}>
          Create a Note
        </ModalHeader>
        <ModalCloseButton onClick={onClose} mt={5} mr={3} />
        <ModalBody>
          <Flex
            width="full"
            direction="column"
            justify="flex-start"
            align="flex-start"
            gap={10}
            mt={3}
          >
            <Flex
              width="full"
              direction="column"
              justify="flex-start"
              align="flex-start"
              gap={7}
            >
              <FormControl isInvalid={isInvalid.title}>
                <Input
                  type="text"
                  placeholder="Title"
                  width="full"
                  maxLength={30}
                  value={formData.title}
                  onFocus={() =>
                    formData.title.length === 0
                      ? setIsInvalid({ ...isInvalid, title: true })
                      : null
                  }
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    e.target.value.trim().length === 0
                      ? setIsInvalid(true)
                      : setIsInvalid(false);
                  }}
                  _focus={{
                    border: "2px solid",
                    borderColor: isInvalid.title
                      ? "red.300"
                      : useColorModeValue("blackAlpha.600", "whiteAlpha.600"),
                    boxShadow: "none",
                  }}
                />
                {isInvalid.title && (
                  <FormErrorMessage>A note must have a title!</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Description"
                  width="full"
                  maxLength={40}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  _focus={{
                    boxShadow: "none",
                    borderColor: useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    ),
                  }}
                />
              </FormControl>
              <FormControl isInvalid={isInvalid.tags}>
                <VStack mb={1}>
                  <Input
                    type="text"
                    placeholder="Tags"
                    width="full"
                    value={formData.currentTag}
                    maxLength={19}
                    onChange={(e) => {
                      validateTags(e);
                    }}
                    _focus={{
                      boxShadow: "none",
                      borderColor: useColorModeValue(
                        "blackAlpha.600",
                        "whiteAlpha.600"
                      ),
                    }}
                  />
                  <HStack
                    justifyContent="space-between"
                    align="flex-start"
                    w="full"
                    gap={3}
                  >
                    <Wrap>
                      {formData.tags.map((tag) => (
                        <Tag
                          key={tag}
                          width="fit-content"
                          px={2}
                          py={1}
                          mr={1}
                          mb={1}
                          fontSize="1rem"
                          backgroundColor={useColorModeValue(
                            "blackAlpha.800",
                            "blackAlpha.600"
                          )}
                          color={useColorModeValue("white", "blackAlpha")}
                        >
                          <TagLabel>{tag}</TagLabel>
                          <TagCloseButton
                            onClick={() =>
                              setFormData({
                                ...formData,
                                tags: formData.tags.filter(
                                  (item) => item !== tag
                                ),
                              })
                            }
                          />
                        </Tag>
                      ))}
                    </Wrap>
                    <Text
                      fontSize="0.9rem"
                      textAlign="right"
                      w="30ch"
                      color={useColorModeValue(
                        "blackAlpha.500",
                        "whiteAlpha.500"
                      )}
                    >
                      Press <Kbd>space</Kbd> to add tag
                    </Text>
                  </HStack>
                  {isInvalid.tags === true ? (
                    <FormErrorMessage>
                      Maximum tags allowed are 5!
                    </FormErrorMessage>
                  ) : null}
                </VStack>
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
              isLoading={buffer}
              color="white"
              onClick={async () => await createNote()}
            >
              Create
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
