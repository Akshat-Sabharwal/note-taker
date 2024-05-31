import {
  Card,
  Flex,
  IconButton,
  Tag,
  Heading,
  Text,
  chakra,
  useColorModeValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchResponse } from "../../../utils/fetchResponse";
import { Notes } from "../../../context/notes";
import { RenameModal } from "./RenameModal";
import { NoteModalSkeleton } from "./NoteModalSkeleton";

export const NoteModal = ({ title, description, tags, slug }) => {
  const toast = useToast({ duration: 3000, isClosable: true });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setNotes } = useContext(Notes);
  const [buffer, setBuffer] = useState(false);

  const [formData, setFormData] = useState({
    title: title,
    description: description,
    tags: tags,
  });

  const deleteNote = async () => {
    setBuffer(true);
    await fetchResponse(`note/${slug}`, "DELETE").then(async (res) => {
      await fetchResponse("note", "GET").then(async (res) => {
        if (!res.error) {
          setNotes(res.result);
          toast({ title: "Note deleted!", status: "success" });
        } else {
          toast(res.error.name, res.error.message, "error");
        }
      });
    });
    setBuffer(false);
  };

  return (
    <>
      <RenameModal
        data={{ ...formData, slug }}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Card
        pl={7}
        pr={4}
        pt={5}
        pb={6}
        gap={2}
        boxShadow="md"
        backgroundColor={useColorModeValue("white", "whiteAlpha.200")}
        width={["21rem", "minmax(20rem, 35rem)", "fit-content"]}
        minWidth={{ lg: "22.5rem" }}
      >
        {buffer ? (
          <Spinner />
        ) : (
          <Flex
            gap={10}
            justify="space-between"
            align="flex-start"
            flexDirection="row"
          >
            <Flex
              direction="column"
              justify="flex-start"
              align="flex-start"
              gap={5}
              cursor="pointer"
              onClick={() => navigate(`/note/${slug}`)}
            >
              <chakra.span>
                <Heading mb={1} fontSize={["1.6rem", "1.8rem", "2rem"]}>
                  {title}
                </Heading>
                <Text
                  fontSize={["0.9rem", "1rem", "1.1rem"]}
                  color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
                  maxWidth="30ch"
                >
                  {description}
                </Text>
              </chakra.span>
              <HStack>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    width="fit-content"
                    px={2}
                    py={1}
                    pb={2}
                    fontSize="1rem"
                    backgroundColor={useColorModeValue(
                      "blackAlpha.800",
                      "blackAlpha.600"
                    )}
                    color={useColorModeValue("white", "blackAlpha")}
                  >
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </Flex>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaEllipsisVertical />}
                p={3}
                maxWidth="3rem"
                size="lg"
                fontSize="1.7rem"
                variant="ghost"
                _hover={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
                _active={{
                  backgroundColor: useColorModeValue(
                    "blackAlpha.300",
                    "whiteAlpha.300"
                  ),
                }}
              />
              <MenuList
                backgroundColor={useColorModeValue("white", "black")}
                transition="0s"
              >
                <MenuItem
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.200",
                      "whiteAlpha.200"
                    ),
                  }}
                  backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                  onClick={() => navigate(`/note/${slug}`)}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.200",
                      "whiteAlpha.200"
                    ),
                  }}
                  backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                  onClick={onOpen}
                >
                  Rename
                </MenuItem>
                <MenuItem
                  color="red.400"
                  backgroundColor={useColorModeValue("white", "blackAlpha.800")}
                  _hover={{
                    backgroundColor: useColorModeValue(
                      "blackAlpha.200",
                      "whiteAlpha.200"
                    ),
                  }}
                  onClick={async () => await deleteNote()}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Card>
    </>
  );
};
