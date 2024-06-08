import {
  Card,
  HStack,
  SkeletonText,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

export const NoteModalSkeleton = () => {
  return (
    <Card
      h={{ base: "fit-content", lg: "10rem" }}
      w={{ base: "full", md: "20rem" }}
      p={5}
      boxShadow="md"
      backgroundColor={useColorModeValue("white", "whiteAlpha.200")}
    >
      <Skeleton
        h={5}
        w="full"
        mb={3}
        startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      />
      <SkeletonText
        noOfLines={3}
        spacing={2}
        mb={5}
        startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      />
      <HStack gap={3}>
        <Skeleton
          h={6}
          w={8}
          startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
          endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        />
        <Skeleton
          h={6}
          w={10}
          startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
          endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        />
      </HStack>
    </Card>
  );
};
