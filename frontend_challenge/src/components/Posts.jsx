import {
  HStack,
  Stack,
  Text,
  useDisclosure,
  Button,
  Divider,
  Box,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { CustomModal } from "../components/CustomModal";

const Posts = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const modalTitle = "Modal";
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida enim purus, eget commodo metus. Phasellus gravida enim purus. ";
  return (
    <Stack
      w={["100%", "66.66%"]}
      margin={["0px", "50px"]}
      marginBottom={["50px", "0px"]}
    >
      <HStack justifyContent="space-between" margin="10px">
        <HStack>
          <Text fontSize="3xl" marginLeft="10px">
            Posts
          </Text>
          <Button onClick={onOpen}>New Post</Button>
        </HStack>
        <Box>
          <Select
            placeholder="Sort"
            variant="outline"
            // onChange={onSelect}
            // value={selectedSort}
          ></Select>
        </Box>
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

export default Posts;
