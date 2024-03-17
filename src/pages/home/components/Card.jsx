import { Card, Icon, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export const SideCard = ({ icon, text }) => {
  return (
    <Card
      direction="row"
      p={4}
      size="lg"
      gap={5}
      align="center"
      maxWidth="38rem"
      minWidth="12rem"
      boxShadow={useColorModeValue("md", "0px 6px 10px 2px hsla(210, 0%, 6%)")}
      backgroundColor={useColorModeValue("whiteAlpha.900", "whiteAlpha.300")}
    >
      <Icon
        as={icon}
        fontSize={["3rem", "3.3rem", "4rem"]}
        backgroundColor={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
        color={useColorModeValue("whiteAlpha.900", "blackAlpha.900")}
        borderRadius={6}
        p={3}
      />
      <Text
        fontSize={["1rem", "1.2rem", "1.3rem"]}
        mr={3}
        color={useColorModeValue("blackAlpha.900", "whiteAlpha.900")}
      >
        {text}
      </Text>
    </Card>
  );
};
