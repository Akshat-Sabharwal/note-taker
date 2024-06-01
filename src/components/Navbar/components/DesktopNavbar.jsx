import {
  useColorModeValue,
  IconButton,
  Text,
  Heading,
  VStack,
  ListItem,
  List,
  HStack,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";

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
        <HStack gap={3} align="center" justify="flex-start" ml={1}>
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
            <Heading fontSize="1.8rem" mb="2px">
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

{
  /* <chakra.span display="flex" flexDirection="row" gap="0.7rem">
          <IconButton
            icon={<RiMenu5Line />}
            size="lg"
            fontSize="2rem"
            variant="ghost"
            onClick={() => setNavbarIsOpen(!navbarIsOpen)}
            _hover={{
              backgroundColor: useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.300"
              ),
            }}
          />
          {navbarIsOpen ? (
            <Heading fontSize="2rem" mt="3px">
              Noteum
            </Heading>
          ) : null}
        </chakra.span>
        <Flex
          justify="space-between"
          align={navbarIsOpen ? "flex-start" : "center"}
          direction="column"
          height="full"
          width="full"
          gap="3rem"
          pb={2}
        >
          <Flex
            flexDirection="column"
            justify="flex-start"
            variant="ghost"
            height="full"
            width="full"
            gap={5}
          >
            {navbarIsOpen ? (
              <Button
                leftIcon={<IoCreateOutline />}
                size="lg"
                fontSize="2rem"
                pl={3}
                gap="0.5rem"
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                onClick={() => onModalOpen()}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              >
                <Text fontSize="1.35rem">Create note</Text>
              </Button>
            ) : (
              <IconButton
                icon={<IoCreateOutline />}
                onClick={() => onModalOpen()}
                size="lg"
                fontSize="2rem"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
            )}
            {navbarIsOpen ? (
              <Button
                leftIcon={<IoHomeOutline />}
                onClick={() => navigate("/")}
                size="lg"
                fontSize="1.8rem"
                pl={3}
                gap="0.8rem"
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              >
                <Text fontSize="1.35rem">Home</Text>
              </Button>
            ) : (
              <IconButton
                icon={<IoHomeOutline />}
                onClick={() => navigate("/")}
                size="lg"
                fontSize="1.8rem"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
            )}

            {navbarIsOpen ? (
              <Button
                leftIcon={<IoIosReturnLeft />}
                onClick={() => navigate(-1)}
                size="lg"
                fontSize="2.1rem"
                pl={2}
                gap="0.7rem"
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              >
                <Text fontSize="1.35rem">Return</Text>
              </Button>
            ) : (
              <IconButton
                icon={<IoIosReturnLeft />}
                onClick={() => navigate(-1)}
                size="lg"
                fontSize="2rem"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
            )}
          </Flex>
          <VStack>
            <Button onClick={() => navigate("/account")}>Profile</Button>
            {navbarIsOpen ? (
              <Button
                leftIcon={useColorModeValue(
                  <IoSunnyOutline />,
                  <IoMoonOutline />
                )}
                size="lg"
                fontSize="2rem"
                py={6}
                pl={3}
                gap="0.5rem"
                width="full"
                justifyContent="flex-start"
                variant="ghost"
                onClick={toggleColorMode}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              >
                <Text fontSize="1.3rem">Switch Theme</Text>
              </Button>
            ) : (
              <IconButton
                icon={useColorModeValue(<IoSunnyOutline />, <IoMoonOutline />)}
                onClick={toggleColorMode}
                size="xl"
                fontSize="2.1rem"
                variant="ghost"
                p={2}
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
            )}
          </VStack>
        </Flex> */
}
