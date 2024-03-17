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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useBreakpointValue,
} from "@chakra-ui/react";
import { NotesData, NotesDataProvider } from "../../context/notesContext";
import { Navbar } from "../../components/Navbar";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const Note = () => {
  const param = useParams();
  const { notesData, setNotesData } = useContext(NotesData);
  const note = notesData.find((item) => item.heading === param.noteId);
  const [noteInput, setNoteInput] = useState(note.content);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const clear = () => {
    setNoteInput("");
  };

  const saveChanges = () => {
    note.content = noteInput;
    setNotesData([
      ...notesData.slice(0, notesData.indexOf(note)),
      note,
      ...notesData.slice(notesData.indexOf(note), -1),
    ]);
  };

  return (
    <>
      {note != undefined ? (
        <chakra.div
          backgroundColor={useColorModeValue("white", "blackAlpha.800")}
          minHeight="100vh"
        >
          <Navbar />

          <Flex
            justify="flex-start"
            align="flex-start"
            direction="column"
            ml={isMobile ? 0 : "6rem"}
            px={isMobile ? 6 : 10}
            py={8}
            gap={isMobile ? 5 : 10}
          >
            {isMobile ? (
              <>
                <Breadcrumb
                  fontSize={isMobile ? "md" : "lg"}
                  separator={<ChevronRightIcon />}
                  mt={isMobile ? "4rem" : 0}
                >
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={`/dashbaord/${note.heading}`}>
                      {note.heading}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Flex
                  justify="space-between"
                  align="center"
                  direction="row"
                  width="full"
                  mt={isMobile ? 1 : 0}
                >
                  <Flex
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    gap="0.1rem"
                  >
                    <Heading fontSize={["1.7rem", "2rem", "2.2rem"]}>
                      {note.heading}
                    </Heading>
                    <Text
                      fontSize={["0.9rem", "1rem", "1.1rem"]}
                      color={useColorModeValue(
                        "blackAlpha.500",
                        "whiteAlpha.500"
                      )}
                      maxWidth={{
                        base: "20ch",
                        sm: "25ch",
                        md: "28ch",
                        lg: "30ch",
                        xl: "30ch",
                      }}
                    >
                      {note.description.slice(0, 40)}
                    </Text>
                  </Flex>
                  <Tag
                    width="fit-content"
                    px={2}
                    py={1}
                    mt={2}
                    fontSize="1rem"
                    backgroundColor={useColorModeValue(
                      "blackAlpha.800",
                      "blackAlpha.600"
                    )}
                    color={useColorModeValue("white", "blackAlpha")}
                  >
                    {note.tag}
                  </Tag>
                </Flex>
              </>
            ) : (
              <Flex
                justify="space-between"
                align="flex-end"
                direction="row"
                width="full"
              >
                <Flex justify="space-between" align="flex-start" width="full">
                  <Flex
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    gap="0.1rem"
                  >
                    <Heading>{note.heading}</Heading>
                    <Text
                      fontSize={["0.9rem", "1rem", "1.1rem"]}
                      color={useColorModeValue(
                        "blackAlpha.500",
                        "whiteAlpha.500"
                      )}
                      maxWidth={{
                        base: "18ch",
                        sm: "25ch",
                        md: "28ch",
                        lg: "30ch",
                        xl: "30ch",
                      }}
                    >
                      {note.description.slice(0, 40)}
                    </Text>
                    <Tag
                      width="fit-content"
                      px={2}
                      py={1}
                      mt={2}
                      fontSize="1rem"
                      backgroundColor={useColorModeValue(
                        "blackAlpha.800",
                        "blackAlpha.600"
                      )}
                      color={useColorModeValue("white", "blackAlpha")}
                    >
                      {note.tag}
                    </Tag>
                  </Flex>
                  <Breadcrumb
                    fontSize="lg"
                    separator={<ChevronLeftIcon />}
                    mt={3}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/dashbaord/${note.heading}`}>
                        {note.heading}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb>
                </Flex>
              </Flex>
            )}

            <FormControl
              defaultValue={"Hello"}
              borderRadius="lg"
              width="full"
              mr={5}
            >
              <Textarea
                width="full"
                minHeight={isMobile ? "50vh" : "60vh"}
                fontSize={isMobile ? "md" : "xl"}
                p={isMobile ? 4 : 6}
                pt={5}
                boxShadow={useColorModeValue(
                  "inset 0px 3px 4px 1px hsl(0, 0%, 80%)",
                  "inset 0px 3px 4px 1px hsl(0, 0%, 10%)"
                )}
                value={noteInput}
                onChange={(e) => {
                  setNoteInput(e.target.value);
                }}
                _focus={{
                  boxShadow: useColorModeValue(
                    "inset 0px 3px 4px 1px hsl(0, 0%, 80%)",
                    "inset 0px 3px 4px 1px hsl(0, 0%, 10%)"
                  ),
                  outline: "none",
                  border: "none",
                }}
              />
            </FormControl>
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              width="full"
              gap={5}
            >
              <Button
                width="50%"
                variant="outline"
                _hover={{
                  backgroundColor: useColorModeValue("blackAlpha.800", "white"),
                  color: useColorModeValue("white", "blackAlpha.800"),
                }}
                onClick={clear}
              >
                Clear
              </Button>
              <Button
                width="50%"
                backgroundColor={useColorModeValue("blackAlpha.800", "white")}
                color={useColorModeValue("white", "blackAlpha.800")}
                _hover={{
                  backgroundColor: useColorModeValue("blackAlpha.800", "white"),
                  color: useColorModeValue("white", "blackAlpha.800"),
                }}
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </Flex>
          </Flex>
        </chakra.div>
      ) : (
        <Heading>Error</Heading>
      )}
    </>
  );
};
