import {
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  theme,
} from "@chakra-ui/react";
import { CreatNoteModal } from "../CreateNoteModal";
import { MobileNavbar } from "./components/MobileNavbar";
import { DesktopNavbar } from "./components/DesktopNavbar";

import { useNavigate } from "react-router-dom";

import { RxAvatar, RxDashboard } from "react-icons/rx";
import { RiBillLine } from "react-icons/ri";
import { IoIosReturnLeft } from "react-icons/io";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { toggleColorMode } = useColorMode(theme);
  const navigate = useNavigate();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const navbarItems = [
    {
      text: "Dashboard",
      icon: RxDashboard,
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      text: "Subscriptions",
      icon: RiBillLine,
      onClick: () => {
        navigate("/subscriptions");
      },
    },
    {
      text: "Return",
      icon: IoIosReturnLeft,
      onClick: () => {
        navigate(-1);
      },
    },
    {
      text: "Switch Theme",
      icon: [IoSunnyOutline, IoMoonOutline],
      onClick: () => {
        toggleColorMode();
      },
    },
    { text: "Profile", icon: RxAvatar, onClick: () => navigate("/profile") },
  ];

  return (
    <>
      <CreatNoteModal isOpen={isModalOpen} onClose={onModalClose} />
      {isMobile ? (
        <MobileNavbar navbarItems={navbarItems} />
      ) : (
        <DesktopNavbar navbarItems={navbarItems} />
      )}
    </>
  );
};
