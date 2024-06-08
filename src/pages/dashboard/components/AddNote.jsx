import { Box, useColorModeValue } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const AddNote = ({ onOpen }) => {
  return (
    <Box
      border="2px dashed"
      borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
      h={{ base: "9rem", lg: "10rem" }}
      w="clamp(12rem, 100%, 20rem)"
      borderRadius="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      _hover={{
        borderColor: useColorModeValue("blackAlpha.500", "whiteAlpha.500"),
      }}
      role="group"
      onClick={onOpen}
    >
      <AddIcon
        w="2rem"
        h="2rem"
        color={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        _groupHover={{
          color: useColorModeValue("blackAlpha.500", "whiteAlpha.500"),
        }}
      />
    </Box>
  );
};
