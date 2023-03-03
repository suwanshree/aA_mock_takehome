import { Box, Divider, useColorMode } from "@chakra-ui/react";
import Coffees from "../components/Coffees";
import Posts from "../components/Posts";
import ModeButton from "../components/modeButton";

function Home() {
  const { colorMode } = useColorMode();
  return (
    <Box
      display="flex"
      justifyContent={["flex-end", "center"]}
      w="100vw"
      h="100vh"
      flexDirection={["column-reverse", "row"]}
    >
      <ModeButton />
      <Posts />
      <Divider display={["none", "block"]} orientation="vertical" />
      <Coffees />
    </Box>
  );
}

export default Home;
