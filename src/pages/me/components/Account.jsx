import {
  useColorModeValue,
  useToast,
  Card,
  CardBody,
  VStack,
  Heading,
  HStack,
  Text,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User } from "../../../context/user";
import { fetchResponse } from "../../../utils/fetchResponse";
import { useNavigate } from "react-router-dom";

export const Account = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(User);
  const toast = useToast({ isClosable: true, duration: 3000 });
  const [deleteBuffer, setDeleteBuffer] = useState(false);

  const signOut = async () => {
    navigate("/auth/login");
    setUser(null);
    localStorage.setItem("auth", false);
  };

  const deleteAccount = async () => {
    setDeleteBuffer(true);
    await fetchResponse("me", "DELETE").then(() => {
      setDeleteBuffer(false);
      toast({
        title: "User deleted!",
        status: "success",
      });
      navigate("/auth/signup");
    });
  };

  return (
    <Card
      w="full"
      minW="max-content"
      bgColor={useColorModeValue("white", "whiteAlpha.200")}
    >
      <CardBody w="full" px={8} p={7} pb={8}>
        <Heading mb={8} fontSize="1.8rem">
          Account
        </Heading>
        <VStack w="full" justify="flex-start" align="flex-start" gap={3}>
          <HStack align="center" justify="flex-start" gap="3.5rem">
            <Text minW="10rem" fontSize="1.1rem">
              Sign out of account
            </Text>
            <Button
              mt={3}
              minW="fit-content"
              bgColor={useColorModeValue("blackAlpha.800", "whiteAlpha.200")}
              color="whiteAlpha.900"
              _hover={{
                bgColor: useColorModeValue("blackAlpha.900", "whiteAlpha.100"),
              }}
              onClick={async () => await signOut()}
            >
              Sign out
            </Button>
          </HStack>
          <Divider w="90%" />
          <HStack align="center" justify="flex-start" gap="3.5rem">
            <Text minW="10rem" fontSize="1.1rem">
              Delete account
            </Text>
            <Button
              mt={3}
              minW="fit-content"
              bgColor="red.600"
              color="whiteAlpha.900"
              _hover={{
                bgColor: "red.700",
              }}
              isLoading={deleteBuffer}
              onClick={async () => await deleteAccount()}
            >
              Delete Account
            </Button>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
