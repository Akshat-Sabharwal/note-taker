import {
  Heading,
  Tag,
  Text,
  Flex,
  chakra,
  useColorModeValue,
  FormControl,
  Textarea,
  Button,
  HStack,
  VStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchResponse } from "../../utils/fetchResponse";
import { BreadCrumb } from "../../components/BreadCrumb";
import { NoteSkeleton } from "./components/NoteSkeleton";

const DesktopNote = ({ noteData, setNoteData }) => {
  const toast = useToast();
  const param = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const showToast = (title, description, status) => {
    return toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const saveChanges = async () => {
    showToast("Changes Saved!", "", "success");
    await fetchResponse(`note/${param.slug}`, "PATCH", {
      text: noteData.text,
    });
  };

  const clear = () => {
    setNoteData({ ...noteData, text: "" });
  };

  return (
    <>
      <HStack justifyContent="space-between" w="full" alignItems="flex-start">
        <Flex
          justify="space-between"
          align="center"
          direction="row"
          width="full"
          mt={1}
        >
          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            gap="0.3rem"
          >
            <Heading fontSize="2rem">{noteData.title}</Heading>
            <Text
              fontSize={{ base: "0.9rem", lg: "1.1rem" }}
              color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
              maxWidth="45ch"
            >
              {noteData.description}
            </Text>
            <HStack>
              {noteData.tags.map((tag, index) => (
                <Tag
                  key={index}
                  width="fit-content"
                  px={2}
                  py={1}
                  pb={2}
                  mt={2}
                  fontSize="1rem"
                  backgroundColor={useColorModeValue(
                    "blackAlpha.800",
                    "whiteAlpha.300"
                  )}
                  color={useColorModeValue("white", "blackAlpha")}
                >
                  {tag}
                </Tag>
              ))}
            </HStack>
          </Flex>
        </Flex>
        <VStack align="flex-end" gap={{ base: 4, lg: 6 }}>
          <BreadCrumb links={[{ name: "Dashboard", link: "/dashboard" }]} />
          <HStack justify="space-between" align="center" width="full" gap={3}>
            <Button
              size={{ base: "sm", lg: "md" }}
              width="fit-content"
              variant="outline"
              borderColor={useColorModeValue(
                "blackAlpha.500",
                "whiteAlpha.400"
              )}
              _hover={{
                backgroundColor: useColorModeValue(
                  "blackAlpha.800",
                  "whiteAlpha.300"
                ),
                borderColor: "transparent",
                color: useColorModeValue("white", "white"),
              }}
              onClick={clear}
            >
              Clear
            </Button>
            <Button
              size={{ base: "sm", lg: "md" }}
              width="fit-content"
              variant="outline"
              borderColor={useColorModeValue(
                "blackAlpha.500",
                "whiteAlpha.400"
              )}
              _hover={{
                backgroundColor: useColorModeValue(
                  "blackAlpha.800",
                  "whiteAlpha.300"
                ),
                borderColor: "transparent",
                color: useColorModeValue("white", "white"),
              }}
              onClick={saveChanges}
            >
              Save Changes
            </Button>
          </HStack>
        </VStack>
      </HStack>

      <FormControl borderRadius="lg" width="full" mr={5}>
        <Textarea
          width="full"
          minHeight={isMobile ? "60vh" : "68vh"}
          fontSize={isMobile ? "md" : "xl"}
          p={isMobile ? 4 : 6}
          pt={5}
          mt={isMobile ? 2 : 0}
          spellCheck="false"
          value={noteData.text}
          onChange={(e) => {
            setNoteData({ ...noteData, text: e.target.value });
          }}
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: useColorModeValue("blackAlpha.700", "whiteAlpha.500"),
          }}
        />
      </FormControl>
    </>
  );
};

const MobileNote = ({ noteData, setNoteData }) => {
  const toast = useToast();
  const param = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const showToast = (title, description, status) => {
    return toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
    });
  };

  const saveChanges = async () => {
    showToast("Changes Saved!", "", "success");
    await fetchResponse(`note/${param.slug}`, "PATCH", {
      text: noteData.text,
    });
  };

  const clear = () => {
    setNoteData({ ...noteData, text: "" });
  };

  return (
    <>
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        gap="0.3rem"
      >
        <Heading fontSize="2rem">{noteData.title}</Heading>
        <Text
          fontSize={{ base: "0.9rem", lg: "1.1rem" }}
          color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
          maxWidth="45ch"
        >
          {noteData.description}
        </Text>
        <HStack>
          {noteData.tags.map((tag, index) => (
            <Tag
              key={index}
              width="fit-content"
              px={2}
              py={1}
              pb={2}
              mt={2}
              fontSize="1rem"
              backgroundColor={useColorModeValue(
                "blackAlpha.800",
                "whiteAlpha.300"
              )}
              color={useColorModeValue("white", "blackAlpha")}
            >
              {tag}
            </Tag>
          ))}
        </HStack>
      </Flex>

      <FormControl borderRadius="lg" width="full" mr={5}>
        <Textarea
          width="full"
          minHeight={isMobile ? "60vh" : "68vh"}
          fontSize={isMobile ? "md" : "xl"}
          p={isMobile ? 4 : 6}
          pt={5}
          mt={isMobile ? 2 : 0}
          spellCheck="false"
          value={noteData.text}
          onChange={(e) => {
            setNoteData({ ...noteData, text: e.target.value });
          }}
          _focus={{
            boxShadow: "none",
            border: "1px solid",
            borderColor: useColorModeValue("blackAlpha.700", "whiteAlpha.500"),
          }}
        />
      </FormControl>

      <HStack justify="space-between" align="center" w="full">
        <Button
          w="40%"
          variant="outline"
          borderColor={useColorModeValue("blackAlpha.500", "whiteAlpha.400")}
          _hover={{
            backgroundColor: useColorModeValue(
              "blackAlpha.800",
              "whiteAlpha.300"
            ),
            borderColor: "transparent",
            color: useColorModeValue("white", "white"),
          }}
          onClick={clear}
        >
          Clear
        </Button>
        <Button
          w="60%"
          variant="outline"
          borderColor={useColorModeValue("blackAlpha.500", "whiteAlpha.400")}
          _hover={{
            backgroundColor: useColorModeValue(
              "blackAlpha.800",
              "whiteAlpha.300"
            ),
            borderColor: "transparent",
            color: useColorModeValue("white", "white"),
          }}
          onClick={saveChanges}
        >
          Save Changes
        </Button>
      </HStack>
    </>
  );
};

export const Note = () => {
  const param = useParams();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [noteData, setNoteData] = useState(null);
  const [buffer, setBuffer] = useState(true);

  useEffect(() => {
    fetchResponse(`note/${param.slug}`, "GET").then((res) => {
      if (res.error) {
        null;
      } else {
        setNoteData(res.result);
        setBuffer(false);
      }
    });
  }, []);

  return (
    <chakra.div
      backgroundColor={useColorModeValue("white", "blackAlpha.700")}
      minHeight="100vh"
    >
      <Navbar />

      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        ml={isMobile ? 0 : "6rem"}
        px={isMobile ? 6 : "3rem"}
        py={isMobile ? "5rem" : 8}
        gap={isMobile ? 6 : "2.7rem"}
      >
        {buffer === true ? (
          <NoteSkeleton />
        ) : noteData !== null ? (
          isMobile ? (
            <MobileNote noteData={noteData} setNoteData={setNoteData} />
          ) : (
            <DesktopNote noteData={noteData} setNoteData={setNoteData} />
          )
        ) : null}
      </Flex>
    </chakra.div>
  );
};
