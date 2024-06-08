import {
  useDisclosure,
  useColorModeValue,
  Flex,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Heading,
  VStack,
  HStack,
  List,
  ListItem,
  Text,
  Icon,
} from "@chakra-ui/react";

import { RiMenuFill } from "react-icons/ri";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NavbarItem = ({ icon, text, onClick }) => {
  return (
    <ListItem
      w="full"
      pl={2}
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
        <Text fontSize="1.3rem" w="full" mb="2px" mr={4}>
          {text}
        </Text>
      </HStack>
    </ListItem>
  );
};

export const MobileNavbar = ({ navbarItems }) => {
  const menuRef = useRef();
  const navigate = useNavigate();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  return (
    <>
      <Flex
        w="full"
        justify="space-between"
        align="center"
        px={4}
        py={2}
        backdropFilter="auto"
        backdropBlur="0.5rem"
        position="fixed"
        boxShadow="md"
        zIndex="10"
      >
        <Heading
          fontSize="1.5rem"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          Noteum
        </Heading>
        <IconButton
          icon={<RiMenuFill />}
          fontSize="1.4rem"
          variant="ghost"
          ref={menuRef}
          _hover={{
            backgroundColor: useColorModeValue(
              "blackAlpha.300",
              "whiteAlpha.300"
            ),
          }}
          onClick={onDrawerOpen}
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          finalFocusRef={menuRef}
          placement="right"
        >
          <DrawerContent
            backdropFilter="blur(1rem)"
            backgroundColor="transparent"
            maxWidth="17rem"
            pb={3}
          >
            <DrawerHeader fontSize="1.6rem">Noteum</DrawerHeader>
            <DrawerBody>
              <VStack
                align="flex-start"
                justify="space-between"
                gap="5rem"
                pt={1}
                h="full"
              >
                <List w="full">
                  <VStack
                    w="full"
                    gap={3}
                    align="flex-start"
                    justify="flex-start"
                  >
                    {navbarItems.slice(0, 3).map((item) => (
                      <NavbarItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        onClick={item.onClick}
                      />
                    ))}
                  </VStack>
                </List>
                <List w="full">
                  <VStack
                    w="full"
                    gap={2}
                    align="flex-start"
                    justify="flex-start"
                  >
                    <NavbarItem
                      text={navbarItems[3].text}
                      icon={useColorModeValue(
                        navbarItems[3].icon[0],
                        navbarItems[3].icon[1]
                      )}
                      onClick={navbarItems[3].onClick}
                    />
                    <NavbarItem
                      text={navbarItems[4].text}
                      icon={navbarItems[4].icon}
                      onClick={navbarItems[4].onClick}
                    />
                  </VStack>
                </List>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};
