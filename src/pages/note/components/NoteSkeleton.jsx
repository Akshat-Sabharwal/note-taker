import {
  Skeleton,
  SkeletonText,
  HStack,
  Card,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

export const NoteSkeleton = () => {
  return (
    <Card
      h="full"
      w="full"
      boxShadow="none"
      gap="3rem"
      mt={5}
      backgroundColor="transparent"
    >
      <chakra.div>
        <SkeletonText
          noOfLines={4}
          spacing={3}
          maxW="15rem"
          mb={5}
          startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
          endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        />
        <HStack>
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
      </chakra.div>
      <Skeleton
        h="65vh"
        w="87vw"
        startColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      />
    </Card>
  );
};
