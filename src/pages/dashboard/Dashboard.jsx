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
import { ChevronLeftIcon } from "@chakra-ui/icons";

export const Dashboard = () => {
  const { notesData } = useContext(NotesData);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { toggleColorMode } = useColorMode();

  return (
    <>
      <chakra.div
        backgroundColor={useColorModeValue("white", "blackAlpha.800")}
      >
        <Navbar />
        <Flex
          flexDirection="column"
          justify="flex-start"
          align="flex-start"
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
            px={["2rem", "2.5rem", "3rem"]}
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
                </Heading>{" "}
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

          <Grid
            w="full"
            px={["2rem", "2.5rem", "3rem"]}
            mb="3rem"
            templateColumns={[
              "repeat(1, minmax(15rem, 1fr))",
              "repeat(2, minmax(20rem, 1fr))",
              "repeat(3, minmax(28rem, 1fr))",
            ]}
            gap={["1.5rem", "2.5rem", "3.5rem"]}
          >
            {notesData.length !== 0
              ? notesData.map((item) => (
                  <GridItem>
                    <NoteModal
                      heading={item.heading}
                      description={item.description}
                      tag={item.tag}
                    />
                  </GridItem>
                ))
              : null}
          </Grid>
        </Flex>
      </chakra.div>
    </>
  );
};
