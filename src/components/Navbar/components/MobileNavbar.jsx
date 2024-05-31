import {
  theme,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Flex,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  Text,
  Heading,
} from "@chakra-ui/react";

import {
  IoSunnyOutline,
  IoMoonOutline,
  IoCreateOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { IoIosReturnLeft } from "react-icons/io";
import { RiMenu5Line } from "react-icons/ri";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const MobileNavbar = ({ navbarItems }) => {
  const { toggleColorMode } = useColorMode(theme);
  const navigate = useNavigate();
  const menuRef = useRef();

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
        px={[4, 8, 10]}
        pr={[2, 6, 10]}
        py={[3, 4, 8]}
        backdropFilter="auto"
        backdropBlur="0.5rem"
        position="fixed"
        boxShadow={useColorModeValue("md", "dark")}
        zIndex="10"
      >
        <Heading fontSize={["1.8rem", "2.4rem", "2.8rem"]}>Noteum</Heading>
        <Flex justify="flex-start" align="center" gap={[1, 5, 6]}>
          <IconButton
            icon={useColorModeValue(<IoSunnyOutline />, <IoMoonOutline />)}
            onClick={toggleColorMode}
            size="lg"
            fontSize="2.2rem"
            variant="ghost"
            p={1}
            _hover={{
              backgroundColor: useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.300"
              ),
            }}
          />
          <IconButton
            icon={<RiMenu5Line />}
            fontSize="2rem"
            size="lg"
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
        </Flex>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          finalFocusRef={menuRef}
          placement="right"
        >
          <DrawerOverlay />
          <DrawerContent
            maxWidth="17rem"
            backgroundColor={useColorModeValue("#ffffff", "#171717")}
            pb={3}
          >
            <DrawerHeader fontSize="3xl" mt={-1}>
              Noteum
            </DrawerHeader>
            <DrawerBody>
              <Flex
                direction="column"
                justify="space-between"
                align="flex-start"
                width="full"
                height="full"
                pt={2}
                gap={10}
              >
                <Flex
                  direction="column"
                  justify="space-evenly"
                  align="flex-start"
                  gap={3}
                >
                  <Button
                    leftIcon={<IoCreateOutline />}
                    onClick={() => {
                      onModalOpen();
                      onDrawerClose();
                    }}
                    size="lg"
                    fontSize="2rem"
                    pl={2}
                    gap="0.5rem"
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
                    <Text fontSize="1.35rem">Create Note</Text>
                  </Button>
                  <Button
                    leftIcon={<IoHomeOutline />}
                    onClick={() => navigate("/")}
                    size="lg"
                    fontSize="1.8rem"
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
                    <Text fontSize="1.35rem">Home</Text>
                  </Button>
                  <Button
                    leftIcon={<IoIosReturnLeft />}
                    onClick={() => navigate(-1)}
                    size="lg"
                    fontSize="2rem"
                    pl={2}
                    gap="0.5rem"
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
                </Flex>

                <Button
                  leftIcon={useColorModeValue(
                    <IoSunnyOutline />,
                    <IoMoonOutline />
                  )}
                  onClick={toggleColorMode}
                  size="lg"
                  fontSize="1.9rem"
                  pl={2}
                  gap="0.5rem"
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
                  <Text fontSize="1.35rem">Switch Theme</Text>
                </Button>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};
