import {
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  Button,
  useColorModeValue,
  useBreakpointValue,
  HStack,
  Heading,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { useContext, useState } from "react";
import { fetchResponse } from "../../utils/fetchResponse";
import { User } from "../../context/user";

export const Signup = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const toast = useToast({ duration: 4000, isClosable: true });
  const [buffer, setBuffer] = useState(false);
  const { setUser } = useContext(User);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isInvalid, setIsInvalid] = useState({
    email: false,
    password: false,
    name: false,
  });

  const validate = {
    name: (name) => {
      name.trim() === ""
        ? setIsInvalid({ ...isInvalid, name: true })
        : setIsInvalid({ ...isInvalid, name: false });
    },
    email: (email) => {
      validator.isEmail(email)
        ? setIsInvalid({ ...isInvalid, email: false })
        : setIsInvalid({ ...isInvalid, email: true });
    },
    password: (pass) => {
      pass.trim() === ""
        ? setIsInvalid({ ...isInvalid, password: true })
        : setIsInvalid({ ...isInvalid, password: false });
    },
  };

  const signup = () => {
    setBuffer(true);
    fetchResponse("auth/signup", "POST", {
      ...formData,
      role: "user",
    }).then(async (res) =>
      res.error
        ? (toast({
            title: res.error.name,
            description: res.error.message,
            status: "error",
          }),
          setBuffer(false))
        : await fetchResponse("me", "GET").then((res) => {
            setUser(res.result);
            toast({
              title: res.message,
              status: "success",
            });
            setBuffer(false);
            localStorage.setItem("auth", true);
            navigate("/dashboard");
          })
    );
  };

  return (
    <>
      <Flex
        justify="center"
        align={{ base: "flex-start", lg: "center" }}
        w="full"
        h="100vh"
        bgColor={useColorModeValue("white", "blackAlpha.700")}
      >
        <Flex
          justify={{ base: "flex-start", lg: "center" }}
          align="center"
          w={{ base: "35ch", lg: "70%" }}
          gap={{ base: "3rem", lg: "7rem" }}
          mt={{ base: "5rem", lg: null }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Heading
            textAlign="center"
            color={useColorModeValue("blackAlpha.800", "whiteAlpha.900")}
            fontSize={{ base: "2rem", lg: "3rem" }}
            maxW={{ base: "20ch", lg: "30rem" }}
          >
            Create an account with Noteum
          </Heading>
          {!isMobile && (
            <Divider
              orientation="vertical"
              h="40vh"
              borderColor={useColorModeValue(
                "blackAlpha.300",
                "whiteAlpha.400"
              )}
            />
          )}
          <VStack w={{ base: "90%", lg: "33%" }} gap={5}>
            <Card
              p={{ base: 5, lg: 8 }}
              w="full"
              borderRadius="md"
              boxShadow="md"
              bgColor={useColorModeValue("white", "whiteAlpha.100")}
            >
              <VStack gap="2.8rem">
                <VStack gap={{ base: "1.3rem", lg: "1.5rem" }} w="full">
                  <FormControl isInvalid={isInvalid.name}>
                    <Input
                      type="text"
                      placeholder="Username"
                      fontSize={{ base: "1rem", lg: "1.1rem" }}
                      py={{ base: 3, lg: 5 }}
                      px={{ base: 3, lg: 4 }}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        validate.name(e.target.value);
                      }}
                      onFocus={() =>
                        formData.name.length === 0
                          ? setIsInvalid({ ...isInvalid, name: true })
                          : null
                      }
                      _focus={{
                        border: "2px solid",
                        borderColor: isInvalid.name
                          ? "red.300"
                          : useColorModeValue(
                              "blackAlpha.600",
                              "whiteAlpha.600"
                            ),
                        boxShadow: "none",
                      }}
                    />
                    <FormErrorMessage>
                      Username must not be an empty string!
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={isInvalid.email}>
                    <Input
                      type="text"
                      placeholder="E-mail"
                      fontSize={{ base: "1rem", lg: "1.1rem" }}
                      py={{ base: 3, lg: 5 }}
                      px={{ base: 3, lg: 4 }}
                      maxLength={40}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        validate.email(e.target.value);
                      }}
                      onFocus={() =>
                        formData.email.length === 0
                          ? setIsInvalid({ ...isInvalid, email: true })
                          : null
                      }
                      _focus={{
                        border: "2px solid",
                        borderColor: isInvalid.email
                          ? "red.300"
                          : useColorModeValue(
                              "blackAlpha.600",
                              "whiteAlpha.600"
                            ),
                        boxShadow: "none",
                      }}
                    />
                    <FormErrorMessage>Invalid e-mail!</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={isInvalid.password}>
                    <Input
                      type="password"
                      placeholder="Password"
                      fontSize={{ base: "1rem", lg: "1.1rem" }}
                      py={{ base: 3, lg: 5 }}
                      px={{ base: 3, lg: 4 }}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        validate.password(e.target.value);
                      }}
                      onFocus={() =>
                        formData.password.length === 0
                          ? setIsInvalid({ ...isInvalid, password: true })
                          : null
                      }
                      _focus={{
                        border: "2px solid",
                        borderColor: isInvalid.password
                          ? "red.300"
                          : useColorModeValue(
                              "blackAlpha.600",
                              "whiteAlpha.600"
                            ),
                        boxShadow: "none",
                      }}
                    />
                    <FormErrorMessage>
                      Password must not be an empty string!
                    </FormErrorMessage>
                  </FormControl>
                </VStack>
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  bgColor={useColorModeValue("blackAlpha.800")}
                  color={useColorModeValue("white")}
                  variant="outline"
                  w="full"
                  px={4}
                  py={5}
                  fontSize="1.1rem"
                  isDisabled={isInvalid.email || isInvalid.password}
                  isLoading={buffer}
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.900",
                      "whiteAlpha.900"
                    ),
                    color: useColorModeValue("white", "blackAlpha.800"),
                  }}
                  onClick={signup}
                >
                  Continue
                </Button>
              </VStack>
            </Card>
            <Button
              rightIcon={<ArrowForwardIcon />}
              variant="link"
              fontSize={{ base: "1rem", lg: "1.1rem" }}
              onClick={() => navigate("/auth/login")}
            >
              An existing user? Login here
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </>
  );
};
