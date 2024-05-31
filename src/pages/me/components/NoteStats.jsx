import {
  useColorModeValue,
  Card,
  CardBody,
  Heading,
  Button,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { User } from "../../../context/user";
import { fetchResponse } from "../../../utils/fetchResponse";

export const NoteStats = () => {
  const { user, setUser } = useContext(User);
  const [deleteBuffer, setDeleteBuffer] = useState(false);
  const toast = useToast({ duration: 3000, isClosable: true });

  const parseDate = () => {
    const creationDate = Date(Date.now() - Date.parse(user.createdAt)).split(
      " "
    );
    const currentDate = Date(Date.now()).split(" ");

    return `${creationDate[1]} ${creationDate[3]} - ${currentDate[1]} ${currentDate[3]}`;
  };

  const deleteAllNotes = async () => {
    setDeleteBuffer(true);
    await fetchResponse("note", "DELETE");

    await fetchResponse("me", "GET")
      .then((res) =>
        res.error
          ? toast({
              title: res.error.name,
              description: res.error.message,
              status: "error",
            })
          : res
      )
      .then((res) => {
        setUser(res.result);
        setDeleteBuffer(false);
        toast({
          title: "Notes deleted!",
          status: "success",
        });
      });
  };

  return (
    <Card w="full" bgColor={useColorModeValue("white", "whiteAlpha.200")}>
      <CardBody w="full" px={8} p={7} pb={8}>
        <Heading mb={8} fontSize="1.8rem">
          Notes
        </Heading>
        <VStack w="full" justify="flex-start" align="flex-start" gap={5}>
          <Stat>
            <StatLabel fontSize="1.1rem">Active Notes</StatLabel>
            <StatNumber fontSize="2rem">{user.notes.length}</StatNumber>
            <StatHelpText fontSize="1rem">{parseDate()}</StatHelpText>
          </Stat>
          <Button
            mt={3}
            minW="fit-content"
            bgColor="red.600"
            color="whiteAlpha.900"
            _hover={{
              bgColor: "red.700",
            }}
            isLoading={deleteBuffer}
            onClick={async () => await deleteAllNotes()}
          >
            Delete All Notes
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};
