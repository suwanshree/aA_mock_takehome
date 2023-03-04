import {
  HStack,
  Stack,
  Text,
  useDisclosure,
  Button,
  Divider,
  Box,
  Fade,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { CustomModal } from "../components/CustomModal";
import { usePostStore } from "../store";
import PostCard from "./PostCard";

const Posts = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const modalTitle = "Modal";
  const { postList, loadPosts } = usePostStore();
  useEffect(() => {
    loadPosts();
  }, []);
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida enim purus, eget commodo metus. Phasellus gravida enim purus. ";
  return (
    <Stack
      w={["100%", "75%"]}
      margin={["0px", "50px"]}
      marginBottom={["50px", "0px"]}
    >
      <HStack justifyContent="space-between" margin="10px">
        <HStack gap="20px">
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
      <Stack display="flex" overflow="auto" paddingTop="20px">
        {postList?.map((post, i) => (
          <Fade in key={i}>
            <PostCard id={post.id} />
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

export default Posts;
