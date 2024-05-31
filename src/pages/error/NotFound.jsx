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
        w="85vw"
        h="80vh"
        ml="4.5rem"
        bgColor="red.300"
        borderRadius="md"
        justify="center"
        align="center"
      >
        <VStack align="center" gap={3}>
          <Heading
            fontSize="5rem"
            color={useColorModeValue("white", "blackAlpha.800")}
          >
            404
          </Heading>
          <Text
            fontSize="1.8rem"
            color={useColorModeValue("white", "blackAlpha.800")}
          >
            The resource could not be found!
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};
