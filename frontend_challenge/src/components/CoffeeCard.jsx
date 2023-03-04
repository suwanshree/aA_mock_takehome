import {
  HStack,
  Stack,
  Text,
  Image,
  useColorMode,
  Divider,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useCoffeeStore } from "../store";
import mug from "../assets/svgs/mug.svg";
import whiteMug from "../assets/svgs/whiteMug.svg";
import { CloseIcon } from "@chakra-ui/icons";

const CoffeeCard = ({ id }) => {
  const { coffeeList } = useCoffeeStore();
  const { colorMode } = useColorMode();
  const coffee = coffeeList.find((c) => c.id === id);
  return (
    <Box
      position="relative"
      _hover={{
        boxShadow: `0px 3px 20px rgba(${
          colorMode === "light" ? "121, 71, 38" : "0, 188, 212"
        }, 0.40)`,
        "& > button": {
          visibility: "visible",
        },
      }}
    >
      <Stack>
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
      <IconButton
        position="absolute"
        top="5px"
        right="5px"
        aria-label="Remove Coffee"
        icon={<CloseIcon />}
        visibility="hidden"
        onClick={() => console.log("Clicked!")}
      />
    </Box>
  );
};

export default CoffeeCard;
