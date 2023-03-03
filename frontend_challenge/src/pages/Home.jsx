import {
  Text,
  Stack,
  Center,
  Image,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Mug from "../assets/svgs/mug.svg";
import { CustomModal } from "../components/CustomModal";
import ModeButton from "../components/modeButton";

function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const modalTitle = "Modal";
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida enim purus, eget commodo metus. Phasellus gravida enim purus. ";
  return (
    <Center display="flex" justifyContent="center" w="100vw" h="100vh">
      <ModeButton />
      <Stack align="center" spacing="5">
        <Image
          objectFit="cover"
          src={Mug}
          alt="Mug Icon"
          w={["20vw", "10vw"]}
        />
        <Text
          fontSize="6xl"
          fontWeight="bold"
          w={["90vw", "30vw"]}
          textAlign="center"
        >
          Coffee Blog Home
        </Text>
        <Stack spacing="2">
          <Text w={["90vw", "30vw"]} textAlign="center">
            {lorem}
          </Text>
          <Text w={["90vw", "30vw"]} textAlign="center">
            {lorem}
          </Text>
        </Stack>
        <Button onClick={onOpen}>Continue</Button>
      </Stack>
      <CustomModal
        onClose={onClose}
        isOpen={isOpen}
        modalTitle={modalTitle}
        modalDescription={lorem}
      />
    </Center>
  );
}

export default Home;
