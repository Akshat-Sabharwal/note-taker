import {
  useColorModeValue,
  Badge,
  Divider,
  Text,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { User } from "../../../context/user";

export const Subscription = () => {
  const { user } = useContext(User);

  return (
    <Card
      w="full"
      minW="max-content"
      bgColor={useColorModeValue("white", "whiteAlpha.200")}
    >
      <CardBody w="full" p={7} px={8} pb={8}>
        <Heading mb={8} fontSize="1.8rem">
          Subscription
        </Heading>
        <VStack w="full" justify="flex-start" align="flex-start" gap={4} mb={7}>
          <HStack gap={{ base: 4, md: 10 }}>
            <Text fontSize="1.1rem" minW="10rem">
              Active Subscription
            </Text>

            <Badge fontSize="1rem" colorScheme="gray">
              {user.subscription.name}
            </Badge>
          </HStack>
          <Divider w="90%" />
          <HStack gap={{ base: 4, md: 10 }}>
            <Text fontSize="1.1rem" minW="10rem">
              Notes allowed
            </Text>
            <Badge fontSize="1rem" colorScheme="gray">
              {user.subscription.maxNotes}
            </Badge>
          </HStack>
          <Divider w="90%" />
          <HStack gap={{ base: 4, md: 10 }}>
            <Text fontSize="1.1rem" minW="10rem">
              Price
            </Text>
            <Badge fontSize="1rem" colorScheme="gray">
              {user.subscription.price === 0 ? "Free" : user.subscription.price}
            </Badge>
          </HStack>
        </VStack>
        <Button
          minW="fit-content"
          bgColor={useColorModeValue("blackAlpha.800", "whiteAlpha.200")}
          color="whiteAlpha.900"
          _hover={{
            bgColor: useColorModeValue("blackAlpha.900", "whiteAlpha.100"),
          }}
        >
          Upgrade Plan
        </Button>
      </CardBody>
    </Card>
  );
};
