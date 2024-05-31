import {
  Flex,
  VStack,
  Heading,
  Text,
  ButtonGroup,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AuthError = () => {
  const navigate = useNavigate();

  return (
    <Flex w="full" h="100vh" justify="center" align="center">
      <Flex
        w="85vw"
        h="80vh"
        bgColor="red.200"
        borderRadius="md"
        justify="center"
        align="center"
      >
        <VStack align="center" gap={3}>
          <Heading fontSize="5rem">403</Heading>
          <Text fontSize="1.8rem">
            Forbidden resource. User unauthenticated!
          </Text>
          <ButtonGroup w="70%" mt={6}>
            <Button
              w="50%"
              bgColor={useColorModeValue("blackAlpha.800", "whiteAlpha.200")}
              color="white"
              fontSize="1.1rem"
              _hover={{
                bgColor: useColorModeValue("blackAlpha.900", "whiteAlpha.100"),
              }}
              onClick={() => navigate("/auth/login")}
            >
              Login
            </Button>
            <Button
              w="50%"
              bgColor={useColorModeValue("blackAlpha.800", "whiteAlpha.200")}
              color="white"
              fontSize="1.1rem"
              _hover={{
                bgColor: useColorModeValue("blackAlpha.900", "whiteAlpha.100"),
              }}
              onClick={() => navigate("/auth/signup")}
            >
              Sign up
            </Button>
          </ButtonGroup>
        </VStack>
      </Flex>
    </Flex>
  );
};
