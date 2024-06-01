import {
  useColorModeValue,
  chakra,
  Heading,
  VStack,
  HStack,
  Box,
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
      <Box maxW="90vw">
        <VStack
          ml="6rem"
          w="full"
          justify="flex-start"
          align="flex-start"
          gap="3rem"
          pl="3.5rem"
          py={7}
        >
          <Heading>Profile</Heading>
          {buffer ? (
            <MeSkeleton />
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
