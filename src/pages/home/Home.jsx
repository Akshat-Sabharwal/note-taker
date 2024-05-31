import { CiDark, CiLight } from "react-icons/ci";
import { FaGithub, FaRegEdit } from "react-icons/fa";
import { AiOutlineCloudServer } from "react-icons/ai";
import { SiMinds, SiVercel } from "react-icons/si";
import bgPattern from "../../assets/bg-pattern.png";
import bgPatternMobile from "../../assets/bg-pattern-mobile.png";
import bgPatternDark from "../../assets/bg-pattern-dark.png";
import bgPatternMobileDark from "../../assets/bg-pattern-mobile-dark.png";
import side1 from "../../assets/s1-side.png";
import side2 from "../../assets/s2-side.png";
import side2Dark from "../../assets/s2-side-dark.png";
import {
  chakra,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  Image,
  VStack,
  Card,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SideCard } from "./components/Card";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <chakra.div backgroundColor={useColorModeValue("white", "blackAlpha.700")}>
      <Flex
        px={[4, 9, 9]}
        pr={{ base: 3 }}
        py={[3, 6, 6]}
        justify="space-between"
        align="center"
        width="full"
        position="fixed"
        zIndex={10}
        backdropFilter="auto"
        backdropBlur="0.5rem"
        boxShadow="md"
      >
        <Heading color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}>
          Noteum
        </Heading>
        <HStack gap={[1, 2, 4]}>
          <IconButton
            icon={useColorModeValue(<CiLight />, <CiDark />)}
            size="lg"
            fontSize="2.3rem"
            onClick={() => toggleColorMode()}
            p={2}
            variant="ghost"
            _hover={{
              backgroundColor: useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.300"
              ),
            }}
          />
          <IconButton
            icon={<FaGithub />}
            onClick={() =>
              (window.location.href =
                "https://github.com/Akshat-Sabharwal/note-taker")
            }
            size="lg"
            fontSize="2rem"
            p={2}
            variant="ghost"
            _hover={{
              backgroundColor: useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.300"
              ),
            }}
          />
        </HStack>
      </Flex>
      <Flex
        backgroundImage={[
          useColorModeValue(bgPatternMobile, bgPatternMobileDark),
          useColorModeValue(bgPattern, bgPatternDark),
          useColorModeValue(bgPattern, bgPatternDark),
        ]}
        backgroundSize="cover"
        width="100%"
        height="100vh"
        justify="center"
        align="center"
      >
        <VStack
          textAlign="center"
          gap={6}
          align="center"
          maxWidth={{ base: "80%" }}
        >
          <chakra.span>
            <Heading
              fontSize={["2.5rem", "4rem", "4.5rem"]}
              color={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
            >
              Take notes on the go
            </Heading>
            <Text
              fontSize={["1.2rem", "1.4rem", "1.8rem"]}
              color={useColorModeValue("blackAlpha.600", "whiteAlpha.500")}
            >
              A familiar place for your thoughts to reside and flourish
            </Text>
          </chakra.span>
          <Button
            backgroundColor={useColorModeValue(
              "blackAlpha.900",
              "whiteAlpha.200"
            )}
            color="white"
            fontSize={{
              base: "1rem",
              sm: "1.2rem",
              md: "1.4rem",
              lg: "1.6rem",
            }}
            p={{ base: 4, md: 6, lg: 8 }}
            size="lg"
            _hover={{
              backgroundColor: useColorModeValue("black", "whiteAlpha.100"),
            }}
            onClick={() => navigate("/auth/login")}
          >
            Get Started
          </Button>
        </VStack>
      </Flex>
      <Flex
        backgroundColor={useColorModeValue("blackAlpha.900", "whiteAlpha.100")}
        py="5rem"
        px={[0, 0, "4rem"]}
        pr={[0, 0, "5rem"]}
        gap={[1, 3, 5]}
        align="center"
        flexDirection={["column", "column", "row"]}
      >
        <Image
          src={side1}
          maxWidth={["8rem", "12rem", "17rem"]}
          m={[1, 4, 8]}
        />
        <VStack
          gap={{ base: 2, md: 4, lg: 5 }}
          textAlign={["center", "center", "left"]}
          maxWidth="60%"
          ml={[0, 0, 10]}
        >
          <Heading
            color="whiteAlpha.900"
            alignSelf={["center", "center", "flex-start"]}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
          >
            The Perfect Second Brain
          </Heading>
          <Text
            color="whiteAlpha.600"
            fontSize={{ base: "sm", sm: "lg", md: "xl", lg: "2xl" }}
          >
            Orchestrate your thoughts into plans and your plans into actions.
            Make the most of it with Noteum. Create your notes and start jotting
            your thoughts down in Noteum.
          </Text>
        </VStack>
      </Flex>
      <Flex
        p={10}
        marginInline={["0rem", "1rem", "5rem"]}
        my={[5, 7, "5rem"]}
        justify={["center", "center", "space-between"]}
        align="center"
        gap={{ base: "2.5rem", sm: "3rem", md: "4rem", lg: "4rem" }}
      >
        <VStack align="left" gap={{ base: 4, sm: 5, md: 7, lg: 10 }}>
          <SideCard
            icon={FaRegEdit}
            text="Create and modify your notes with a minimalist approach"
            fontsize={"6xl"}
          />
          <SideCard
            icon={AiOutlineCloudServer}
            text="All of it, secure in the cloud, just for you"
            fontsize={"7xl"}
          />
          <SideCard
            icon={SiMinds}
            text="The one-stop solution for all your note-taking needs"
            fontsize={"7xl"}
          />
        </VStack>
        <Image
          src={useColorModeValue(side2, side2Dark)}
          maxWidth="30rem"
          minWidth="14rem"
          display={["none", "none", "inline"]}
        />
      </Flex>
      <Flex width="full" justify="center" align="center" my={[5, 10, "6rem"]}>
        <Card
          backgroundColor={useColorModeValue(
            "blackAlpha.900",
            "whiteAlpha.100"
          )}
          maxWidth="50rem"
          width="60%"
          minWidth="18rem"
          px={10}
          py={8}
          gap={[0, 4, 7]}
        >
          <VStack align="flex-start">
            <Text
              fontSize={["1.7rem", "2rem", "2.5rem"]}
              color={useColorModeValue("white", "whiteAlpha.900")}
            >
              Begin your journey with Noteum
            </Text>
            <Text
              color={useColorModeValue("whiteAlpha.700", "whiteAlpha.700")}
              fontSize={["xl", "xl", "2xl"]}
            >
              Let's make it a notable one!
            </Text>
          </VStack>
          <Button
            variant="outline"
            rightIcon={<ChevronRightIcon />}
            color={"whiteAlpha.900"}
            borderColor="whiteAlpha.300"
            _hover={{
              backgroundColor: "whiteAlpha.100",
              borderColor: "transparent",
            }}
            mt={9}
            p={6}
            fontSize="xl"
            onClick={() => navigate("/auth/login")}
          >
            Get started
          </Button>
        </Card>
      </Flex>
      <Flex
        justify="space-between"
        flexDirection={["column", "column", "row"]}
        align={["flex-start", "flex-start", "center"]}
        p={10}
        marginTop="8rem"
        backgroundColor={useColorModeValue("blackAlpha.900", "whiteAlpha.100")}
        gap={["1rem", "2rem", "5rem"]}
      >
        <Heading
          color="whiteAlpha.900"
          fontSize={{ base: "2.5rem", sm: "3rem", md: "3.5rem", lg: "4rem" }}
          letterSpacing="wider"
          ml={[0, 0, 5]}
        >
          Noteum
        </Heading>
        <VStack
          mr={[1, 3, 10]}
          align={["flex-start", "flex-start", "flex-end"]}
          gap={5}
        >
          <Text color="whiteAlpha.800" fontSize="2xl">
            Akshat Sabharwal
          </Text>
          <HStack gap={5}>
            <Button
              leftIcon={<SiVercel />}
              px={[3.5, 4, 5]}
              py={[5, 6, 7]}
              gap={[1, 2, 2]}
              backgroundColor="white"
              color="blackAlpha.800"
              _hover={{
                backgroundColor: "whiteAlpha.800",
              }}
              fontSize={["1.2rem", "1.4rem", "1.6rem"]}
              onClick={() =>
                (window.location.href = "https://vercel.com/vicuise/noteum")
              }
            >
              Vercel
            </Button>
            <Button
              leftIcon={<FaGithub />}
              px={[3.5, 4, 5]}
              py={[5, 6, 7]}
              gap={2}
              backgroundColor="white"
              color="blackAlpha.800"
              _hover={{
                backgroundColor: "whiteAlpha.800",
              }}
              fontSize={["1.2rem", "1.4rem", "1.6rem"]}
              onClick={() =>
                (window.location.href =
                  "https://github.com/Akshat-Sabharwal/noteum")
              }
            >
              Github
            </Button>
          </HStack>
        </VStack>
      </Flex>
    </chakra.div>
  );
};
