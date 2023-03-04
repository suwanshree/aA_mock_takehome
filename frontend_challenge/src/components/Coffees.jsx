import {
  Stack,
  HStack,
  Text,
  useDisclosure,
  Button,
  Fade,
  Box,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { CustomModal } from "../components/CustomModal";
import { useCoffeeStore } from "../store";
import CoffeeCard from "./CoffeeCard";

const Coffees = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const modalTitle = "Modal";
  const { coffeeList, loadCoffees } = useCoffeeStore();
  useEffect(() => {
    loadCoffees();
  }, []);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida enim purus, eget commodo metus. Phasellus gravida enim purus. ";
  return (
    <Stack
      w={["100%", "25%"]}
      margin={["0px", "50px"]}
      marginBottom={["50px", "0px"]}
      marginTop={["100px", "50px"]}
    >
      <HStack gap="20px" margin="10px">
        <Text fontSize="3xl">Coffees</Text>
        <Button onClick={onOpen}>New Coffee</Button>
      </HStack>
      <Stack display="flex" overflow="auto" paddingTop="20px">
        {coffeeList?.map((coffee, i) => (
          <Fade in key={i}>
            <CoffeeCard id={coffee.id} />
          </Fade>
        ))}
        <Box h="2vh"></Box>
      </Stack>
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
