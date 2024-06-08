import {
  Flex,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <Flex w="full" h="100vh" justify="center" align="center">
      <Flex
        w={{ base: "95vw", md: "85vw" }}
        h={{ base: "85vh", md: "80vh" }}
        ml={{ base: "0rem", md: "4.5rem" }}
        mt={{ base: "4rem", md: "0rem" }}
        bgColor="red.300"
        borderRadius="md"
        justify="center"
        align="center"
      >
        <VStack align="center" gap={{ base: 1, lg: 3 }}>
          <Heading
            fontSize={{ base: "4rem", md: "5rem" }}
            color={useColorModeValue("white", "blackAlpha.800")}
          >
            404
          </Heading>
          <Text
            fontSize={{ base: "1.3rem", md: "1.8rem" }}
            maxW={{ base: "20ch", lg: "45ch" }}
            textAlign="center"
            color={useColorModeValue("white", "blackAlpha.800")}
          >
            The resource could not be found!
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};
