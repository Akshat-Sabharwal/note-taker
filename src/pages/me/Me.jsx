import {
  useColorModeValue,
  chakra,
  Heading,
  VStack,
  HStack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar/Navbar";
import { useEffect, useContext } from "react";
import { Credentials } from "./components/Credentials";
import { Subscription } from "./components/Subscription";
import { NoteStats } from "./components/NoteStats";
import { Account } from "./components/Account";
import { AuthError } from "../error/AuthError";
import { MeSkeleton } from "./components/MeSkeleton";
import { User } from "../../context/user";
import { fetchResponse } from "../../utils/fetchResponse";

export const Me = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { setUser, buffer, setBuffer } = useContext(User);
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    const fetchUser = async () => {
      setBuffer(true);

      auth === "true"
        ? await fetchResponse("me", "GET")
            .then((res) => (res.error ? null : setUser(res.result)))
            .then(() => {
              setBuffer(false);
            })
        : null;
    };

    fetchUser();
  }, []);

  return auth === "true" ? (
    <chakra.div
      backgroundColor={useColorModeValue("white", "blackAlpha.700")}
      overflowX="hidden"
      minH="100vh"
    >
      <Navbar />
      <Box maxW="100vw">
        <VStack
          w="full"
          justify="flex-start"
          align={{ base: "center", lg: "flex-start" }}
          gap="2rem"
          mt={{ base: "4rem", md: "0rem" }}
          ml={{ md: "6rem" }}
          px={{ base: "1.4rem", md: "2rem" }}
          pr={{ md: "9rem" }}
          py={7}
        >
          <Heading
            fontSize={{ base: "2xl", md: "3xl" }}
            mt={1}
            alignSelf="flex-start"
          >
            Profile
          </Heading>
          {buffer ? (
            <MeSkeleton />
          ) : isMobile ? (
            <VStack w="full" minW="15rem" gap={5}>
              <Credentials />
              <Subscription />
              <NoteStats />
              <Account />
            </VStack>
          ) : (
            <HStack w="full" justify="flex-start" align="flex-start" gap={7}>
              <VStack justify="flex-start" align="flex-start" w="50%" gap={7}>
                <Credentials />
                <Subscription />
              </VStack>
              <VStack justify="flex-start" align="flex-start" w="50%" gap={7}>
                <NoteStats />
                <Account />
              </VStack>
            </HStack>
          )}
        </VStack>
      </Box>
    </chakra.div>
  ) : (
    <AuthError />
  );
};
