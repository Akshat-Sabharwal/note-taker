import {
  useColorModeValue,
  useBreakpointValue,
  useToast,
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
  VStack,
  HStack,
  Kbd,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { fetchResponse } from "../../../utils/fetchResponse";
import { useContext, useState } from "react";
import { Notes } from "../../../context/notes";

export const RenameModal = ({ data, isOpen, onClose }) => {
  const toast = useToast({ isClosable: true, duration: 3000 });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const initialForm = {
    title: "",
    description: "",
    tags: [],
    currentTag: "",
  };

  const { setNotes } = useContext(Notes);

  const [formData, setFormData] = useState(initialForm);
  const [buffer, setBuffer] = useState(false);

  const [isInvalid, setIsInvalid] = useState({
    tags: formData.tags.length >= 5,
  });

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

  const updateNote = async () => {
    setBuffer(true);

    await fetchResponse(
      `note/${data.slug}`,
      "PATCH",
      Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) =>
            value !== "" && (!Array.isArray(value) || value.length > 0)
        )
      )
    ).then((res) =>
      res.error
        ? toast({
            title: res.error.name,
            description: res.error.message,
            status: "error",
          })
        : toast({
            title: res.message,
            status: "success",
          })
    );

    await fetchResponse("note", "GET").then((res) => {
      setNotes(res.result);
      setBuffer(false);
      onClose();
    });
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
          Rename Note
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
              <FormControl>
                <Input
                  type="text"
                  placeholder="Title"
                  width="full"
                  maxLength={30}
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  _focus={{
                    border: "2px solid",
                    borderColor: useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    ),
                    boxShadow: "none",
                  }}
                />
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
              color="white"
              isLoading={buffer}
              onClick={async () => await updateNote()}
            >
              Rename
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
