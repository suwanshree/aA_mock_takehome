import {
  Stack,
  HStack,
  Text,
  useDisclosure,
  Button,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { CustomModal } from "../components/CustomModal";

const Coffees = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const modalTitle = "Modal";
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida enim purus, eget commodo metus. Phasellus gravida enim purus. ";
  return (
    <Stack
      w={["100%", "33.33%"]}
      margin={["0px", "50px"]}
      marginBottom={["50px", "0px"]}
      marginTop={["100px", "50px"]}
    >
      <HStack margin="10px">
        <Text fontSize="3xl">Coffees</Text>
        <Button onClick={onOpen}>New Coffee</Button>
      </HStack>
      <Divider
        borderColor={colorMode === "light" ? "brown" : "cyan"}
        size="100"
      />
      <CustomModal
        onClose={onClose}
        isOpen={isOpen}
        modalTitle={modalTitle}
        modalDescription={lorem}
      />
    </Stack>
  );
};

export default Coffees;
