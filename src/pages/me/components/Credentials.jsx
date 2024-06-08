import {
  useColorModeValue,
  useDisclosure,
  useToast,
  FormControl,
  Text,
  Input,
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  VStack,
  Skeleton,
  Divider,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  InputGroup,
  InputRightAddon,
  ModalContent,
  Icon,
  FormErrorMessage,
  useBreakpointValue,
} from "@chakra-ui/react";
import { User } from "../../../context/user";
import { useContext, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { fetchResponse } from "../../../utils/fetchResponse";

const PasswordModal = ({ onClose, isOpen }) => {
  const [visible, setVisible] = useState(false);
  const [buffer, setBuffer] = useState(false);
  const toast = useToast({ duration: 3000, isClosable: true });

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    validate();
  }, [formData]);

  const resetPassword = async () => {
    setBuffer(true);

    await fetchResponse("me", "PATCH", {
      password: formData.password,
    }).then((res) =>
      res.error
        ? (toast({
            title: res.error.name,
            description: res.error.message,
            status: "error",
          }),
          setBuffer(false))
        : (toast({
            title: res.message,
            status: "success",
          }),
          setBuffer(false),
          onClose())
    );
  };

  const validate = () => {
    if (formData.password === formData.confirmPassword) {
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        bgColor={useColorModeValue("white", "blackAlpha.700")}
        color={useColorModeValue("blackAlpha.800", "white")}
      >
        <ModalOverlay />

        <ModalContent
          px={2}
          maxW="90vw"
          backgroundColor={useColorModeValue("white", "#191a1c")}
        >
          <ModalCloseButton mt={4} mr={4} />
          <ModalHeader fontSize="1.8rem">Reset Password</ModalHeader>
          <ModalBody>
            <VStack gap={5} w="full" mt={4}>
              <FormControl>
                <InputGroup
                  _focus={{
                    boxShadow: "none",
                    borderColor: useColorModeValue(
                      "blackAlpha.700",
                      "whiteAlpha.300"
                    ),
                  }}
                >
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="New Password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      });
                    }}
                    _focus={{
                      boxShadow: "none",
                      borderColor: useColorModeValue(
                        "blackAlpha.700",
                        "whiteAlpha.300"
                      ),
                    }}
                  />
                  <InputRightAddon
                    bgColor={useColorModeValue(
                      "blackAlpha.800",
                      "whiteAlpha.200"
                    )}
                    color="white"
                    _hover={{
                      bgColor: useColorModeValue(
                        "blackAlpha.900",
                        "whiteAlpha.100"
                      ),
                      color: "white",
                    }}
                    onClick={() => setVisible(!visible)}
                    cursor="pointer"
                  >
                    <Icon as={visible ? ViewOffIcon : ViewIcon} />
                  </InputRightAddon>
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={isInvalid}>
                <InputGroup>
                  <Input
                    type={visible ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      });
                    }}
                    _focus={{
                      boxShadow: "none",
                      borderColor: useColorModeValue(
                        "blackAlpha.700",
                        "whiteAlpha.300"
                      ),
                    }}
                  />
                  <InputRightAddon
                    bgColor={useColorModeValue(
                      "blackAlpha.800",
                      "whiteAlpha.200"
                    )}
                    color="white"
                    _hover={{
                      bgColor: useColorModeValue(
                        "blackAlpha.900",
                        "whiteAlpha.100"
                      ),
                      color: "white",
                    }}
                    onClick={() => setVisible(!visible)}
                    cursor="pointer"
                  >
                    <Icon as={visible ? ViewOffIcon : ViewIcon} />
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>Passwords don't match!</FormErrorMessage>
              </FormControl>
              <Button
                w="full"
                fontSize="1.1rem"
                my={4}
                bgColor={useColorModeValue("blackAlpha.800", "whiteAlpha.200")}
                color="white"
                _hover={{
                  bgColor: useColorModeValue(
                    "blackAlpha.900",
                    "whiteAlpha.100"
                  ),
                  color: "white",
                }}
                isLoading={buffer}
                isDisabled={isInvalid}
                onClick={async () => await resetPassword()}
              >
                Reset
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Credentials = () => {
  const { user, setUser } = useContext(User);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast({ duration: 3000, isClosable: true });

  const updateUser = () => {
    fetchResponse("me", "PATCH", { name: user.name }).then((res) => {
      if (res.error) {
        toast({
          title: res.error.name,
          description: res.error.message,
          status: "error",
        });
      }
      {
        toast({
          title: res.message,
          status: "success",
        });
        setUser({ ...user, name: res.result.name });
      }
    });
  };

  return (
    <>
      <PasswordModal onClose={onClose} isOpen={isOpen} />
      <Card w="100%" bgColor={useColorModeValue("white", "whiteAlpha.200")}>
        <CardBody w="full" px={8} p={{ base: 6, md: 8 }} pb={8}>
          <Heading mb={8} fontSize="1.8rem">
            Credentials
          </Heading>
          <VStack w="full" justify="flex-start" align="flex-start" gap={5}>
            {isMobile ? (
              <>
                <VStack align="flex-start">
                  <Text fontSize={{ base: "1rem", lg: "1.1rem" }} minW="6rem">
                    Username
                  </Text>
                  <FormControl>
                    <Input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" ? updateUser() : null
                      }
                      maxW="15rem"
                      _focus={{
                        boxShadow: "none",
                        borderColor: useColorModeValue(
                          "blackAlpha.500",
                          "whiteAlpha.500"
                        ),
                      }}
                    />
                  </FormControl>
                </VStack>
                <VStack align="flex-start">
                  <Text minW="6rem" fontSize={{ base: "1rem", lg: "1.1rem" }}>
                    E-mail
                  </Text>
                  <FormControl>
                    <Input
                      type="text"
                      value={user.email}
                      disabled={true}
                      maxW="15rem"
                    />
                  </FormControl>
                </VStack>
                <Button
                  mt={3}
                  minW="fit-content"
                  bgColor={useColorModeValue(
                    "blackAlpha.800",
                    "whiteAlpha.200"
                  )}
                  color="whiteAlpha.900"
                  _hover={{
                    bgColor: useColorModeValue(
                      "blackAlpha.900",
                      "whiteAlpha.100"
                    ),
                  }}
                  onClick={onOpen}
                >
                  Reset Passsword
                </Button>
              </>
            ) : (
              <>
                <HStack justify="space-between" align="center" gap="3.5rem">
                  <Text fontSize="1.1rem" minW="6rem">
                    Username
                  </Text>
                  <FormControl>
                    <Input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" ? updateUser() : null
                      }
                      maxW="15rem"
                      _focus={{
                        boxShadow: "none",
                        borderColor: "whiteAlpha.500",
                      }}
                    />
                  </FormControl>
                </HStack>
                <Divider w="90%" />
                <HStack justify="space-between" align="center" gap="3.5rem">
                  <Text minW="6rem" fontSize="1.1rem">
                    E-mail
                  </Text>
                  <FormControl>
                    <Input
                      type="text"
                      value={user.email}
                      disabled={true}
                      maxW="15rem"
                    />
                  </FormControl>
                </HStack>
                <Divider w="90%" />
                <Button
                  mt={3}
                  minW="fit-content"
                  bgColor={useColorModeValue(
                    "blackAlpha.800",
                    "whiteAlpha.200"
                  )}
                  color="whiteAlpha.900"
                  _hover={{
                    bgColor: useColorModeValue(
                      "blackAlpha.900",
                      "whiteAlpha.100"
                    ),
                  }}
                  onClick={onOpen}
                >
                  Reset Passsword
                </Button>
              </>
            )}
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};
