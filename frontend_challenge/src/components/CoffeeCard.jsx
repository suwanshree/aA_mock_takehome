import {
  HStack,
  Stack,
  Text,
  Image,
  useColorMode,
  Divider,
} from "@chakra-ui/react";
import { useCoffeeStore } from "../store";
import mug from "../assets/svgs/mug.svg";
import whiteMug from "../assets/svgs/whiteMug.svg";

const CoffeeCard = ({ id }) => {
  const { coffeeList } = useCoffeeStore();
  const { colorMode } = useColorMode();
  const coffee = coffeeList.find((c) => c.id === id);
  return (
    <Stack padding="20px">
      <HStack display="flex" alignItems="center" padding="20px">
        <Image
          src={colorMode === "light" ? mug : whiteMug}
          alt="Coffee Image"
          w="25px"
        />
        <Text paddingLeft="10px" fontSize="xl">
          {coffee.name} -
        </Text>
        <Text fontSize="xl">{coffee.year}</Text>
      </HStack>
      <Divider
        borderColor={colorMode === "light" ? "brown" : "cyan"}
        size="100"
      />
    </Stack>
  );
};

export default CoffeeCard;
