import {
  useColorModeValue,
  IconButton,
  Heading,
  VStack,
  List,
  HStack,
  ListItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NavbarItem = ({ icon, text, expanded, onClick }) => {
  return (
    <ListItem
      w="full"
      px={2}
      pl={expanded ? 3 : 2}
      py={1}
      borderRadius="md"
      _hover={{
        backgroundColor: useColorModeValue("blackAlpha.300", "whiteAlpha.300"),
      }}
      cursor="pointer"
      onClick={onClick}
    >
      <HStack
        w="full"
        h="fit-content"
        align="center"
        justify="flex-start"
        gap={4}
      >
        <Icon as={icon} fontSize="1.5rem" h={8} />
        {expanded ? (
          <Text fontSize="1.3rem" w="full" mb="2px" mr={4}>
            {text}
          </Text>
        ) : null}
      </HStack>
    </ListItem>
  );
};

export const DesktopNavbar = ({ navbarItems }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <VStack
        backdropFilter="blur(1rem)"
        boxShadow="md"
        position="fixed"
        left={0}
        align="flex-start"
        justify="flex-start"
        gap="3.2rem"
        py={7}
        px={5}
        h="full"
        overflow="hidden"
        transitionDuration="0.3s"
        zIndex={999}
      >
        <HStack
          gap={3}
          align="center"
          justify="flex-start"
          ml={expanded ? 1 : 0}
        >
          <IconButton
            icon={<RiMenuFill />}
            fontSize="1.5rem"
            variant="ghost"
            p={2}
            _hover={{
              backgroundColor: useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.300"
              ),
            }}
            onClick={() => setExpanded(!expanded)}
          />
          {expanded ? (
            <Heading
              fontSize="1.8rem"
              mb="2px"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              Noteum
            </Heading>
          ) : null}
        </HStack>
        <VStack
          h="full"
          align="flex-start"
          justify="space-between"
          mr={expanded ? 2 : 0}
          gap="5rem"
        >
          <List w="full">
            <VStack w="full" gap={3} align="flex-start" justify="flex-start">
              {navbarItems.slice(0, 3).map((item) => (
                <NavbarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  expanded={expanded}
                  onClick={item.onClick}
                />
              ))}
            </VStack>
          </List>
          <List w="full">
            <VStack w="full" gap={2} align="flex-start" justify="flex-start">
              <NavbarItem
                text={navbarItems[3].text}
                icon={useColorModeValue(
                  navbarItems[3].icon[0],
                  navbarItems[3].icon[1]
                )}
                expanded={expanded}
                onClick={navbarItems[3].onClick}
              />
              <NavbarItem
                text={navbarItems[4].text}
                icon={navbarItems[4].icon}
                expanded={expanded}
                onClick={navbarItems[4].onClick}
              />
            </VStack>
          </List>
        </VStack>
      </VStack>
    </>
  );
};
