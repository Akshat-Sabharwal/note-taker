import { Navbar } from "../../components/Navbar/Navbar";
import { NotFound } from "../error/NotFound";
import { chakra, useColorModeValue } from "@chakra-ui/react";

export const Subscriptions = () => {
  return (
    <chakra.div
      backgroundColor={useColorModeValue("white", "blackAlpha.700")}
      overflowX="hidden"
    >
      <Navbar />
      <NotFound />
    </chakra.div>
  );
};
