import "./Dashboard.css";
import {
  Flex,
  IconButton,
  Heading,
  Grid,
  GridItem,
  chakra,
  useBreakpointValue,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { NoteModal } from "./components/NoteModal";
import { Navbar } from "../../components/Navbar";
import { NotesData } from "../../context/notesContext";
import { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export const Dashboard = () => {
  const { notesData } = useContext(NotesData);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: true, md: true, lg: false });
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <chakra.div
        backgroundColor={useColorModeValue("white", "blackAlpha.800")}
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
          <Flex
            width="full"
            align="flex-start"
            justify="space-between"
            direction={["column", "column", "row"]}
            gap="1.5rem"
            px={["1.2rem", "2.5rem", "3rem"]}
            py="0.7rem"
            mt={isMobile ? "6rem" : "2rem"}
          >
            {isMobile ? (
              <>
                <Breadcrumb separator={<ChevronRightIcon />} fontSize="1.2rem">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
                <Heading fontSize={isMobile ? "2rem" : "2.5rem"}>
                  Recents
                </Heading>
              </>
            ) : (
              <>
                <Heading fontSize={isMobile ? "2rem" : "2.5rem"}>
                  Recents
                </Heading>
                <Breadcrumb separator={<ChevronLeftIcon />} fontSize="1.2rem">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </>
            )}
          </Flex>

          {isTablet ? (
            <Flex
              direction="column"
              justify="flex-start"
              align="center"
              w="full"
              mb={10}
              mx={10}
              gap={["1.5rem", "2rem", "2.5rem"]}
            >
              {notesData.length !== 0
                ? notesData.map((item) => (
                    <NoteModal
                      heading={item.heading}
                      description={item.description}
                      tag={item.tag}
                    />
                  ))
                : null}
            </Flex>
          ) : (
            <Flex gap={10} w="full" mb="3rem" px="3rem" wrap="wrap">
              {notesData.length !== 0
                ? notesData.map((item) => (
                    <NoteModal
                      heading={item.heading}
                      description={item.description}
                      tag={item.tag}
                    />
                  ))
                : null}
            </Flex>
          )}
        </Flex>
      </chakra.div>
    </>
  );
};
