import { Card, Icon, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export const SideCard = ({ icon, text }) => {
  return (
    <Card
      direction="row"
      p={{ base: 2, lg: 4 }}
      size="lg"
      gap={5}
      align="center"
      borderRadius="md"
      maxWidth="38rem"
      minWidth="12rem"
      boxShadow={useColorModeValue("md", "none")}
      backgroundColor={useColorModeValue("whiteAlpha.900", "whiteAlpha.100")}
    >
      <Icon
        as={icon}
        fontSize={["3rem", "3.3rem", "4rem"]}
        backgroundColor={useColorModeValue("blackAlpha.900", "whiteAlpha.100")}
        color={useColorModeValue("whiteAlpha.900", "whiteAlpha.900")}
        borderRadius={6}
        p={3}
      />
      <Text
        fontSize={{ base: "0.9rem", lg: "1.3rem" }}
        mr={3}
        color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}
      >
        {text}
      </Text>
    </Card>
  );
};
