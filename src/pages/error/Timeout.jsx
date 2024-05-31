import { Flex, VStack, Heading, Text } from "@chakra-ui/react";

export const Timeout = () => {
  return (
    <Flex
      w="full"
      h="75vh"
      justify="center"
      align="center"
      bgColor="red.200"
      borderRadius="md"
    >
      <VStack align="center" gap={5}>
        <Heading fontSize="3rem">Response Timeout</Heading>
        <Text fontSize="1.5rem">Data fetch took unexpectedly long!</Text>
      </VStack>
    </Flex>
  );
};
