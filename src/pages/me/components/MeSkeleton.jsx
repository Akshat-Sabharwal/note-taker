import { Skeleton, HStack, VStack } from "@chakra-ui/react";

export const MeSkeleton = () => {
  return (
    <HStack w="full" justify="flex-start" align="flex-start" gap={7}>
      <VStack justify="flex-start" align="flex-start" w="50%" gap={7}>
        <Skeleton h="21rem" w="full" />
        <Skeleton h="21rem" w="full" />
      </VStack>
      <VStack justify="flex-start" align="flex-start" w="50%" gap={7}>
        <Skeleton h="19rem" w="full" />
        <Skeleton h="19rem" w="full" />
      </VStack>
    </HStack>
  );
};
