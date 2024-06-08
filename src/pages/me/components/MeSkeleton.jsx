import { Skeleton, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";

export const MeSkeleton = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return isMobile ? (
    <VStack w="full" gap={5}>
      <Skeleton h="21rem" w="full" />
      <Skeleton h="21rem" w="full" />
      <Skeleton h="21rem" w="full" />
      <Skeleton h="21rem" w="full" />
    </VStack>
  ) : (
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
