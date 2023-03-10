import {
  HStack,
  Stack,
  Text,
  useDisclosure,
  Button,
  Divider,
  Box,
  Fade,
  Image,
  Select,
  useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CustomModal } from "../components/CustomModal";
import { usePostStore, useCoffeeStore } from "../store";
import hotCoffee from "../assets/gifs/hot-coffee.gif";
import PostCard from "./PostCard";

const Posts = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode } = useColorMode();
  const [order, setOrder] = useState("ASC");
  const {
    postList,
    coffeePostList,
    isCoffeeSelected,
    loadPosts,
    setIsCoffeeSelected,
  } = usePostStore();
  const { coffeeList } = useCoffeeStore();
  let postsToDisplay = isCoffeeSelected ? coffeePostList : postList;
  const currentCoffee = coffeeList?.find(
    (c) => c.id === coffeePostList[0]?.coffee
  );
  const howAllPostsHandler = (event) => {
    event.preventDefault();
    loadPosts(order);
    setIsCoffeeSelected(false);
  };
  useEffect(() => {
    loadPosts(order);
  }, [coffeeList, order, loadPosts]);
  const onSubmit = () => {};
  return (
    <Stack
      w={["100%", "75%"]}
      margin={["0px", "50px"]}
      marginBottom={["50px", "0px"]}
    >
      <HStack justifyContent="space-between" margin="10px">
        <HStack gap="20px">
          <Image src={hotCoffee} alt="Coffee Gif" w="50px" marginLeft="10px" />
          <Text fontSize="5xl">
            {isCoffeeSelected ? `Posts - ${currentCoffee?.name}` : "Posts"}
          </Text>
          <Button onClick={onOpen}>New Post</Button>
        </HStack>
        <Box>
          {isCoffeeSelected ? (
            <Button onClick={howAllPostsHandler}>All Posts</Button>
          ) : (
            <Select
              variant="outline"
              onChange={(event) => setOrder(event.target.value)}
              value={order}
            >
              <option value="ASC">asc</option>
              <option value="DESC">desc</option>
            </Select>
          )}
        </Box>
      </HStack>
      <Divider
        borderColor={colorMode === "light" ? "brown" : "cyan"}
        size="100"
      />
      <Stack display="flex" overflow="auto" paddingTop="20px">
        {postsToDisplay?.map((post, i) => (
          <Fade in key={i}>
            <PostCard id={post.id} />
          </Fade>
        ))}
        <Box h="2vh"></Box>
      </Stack>
      <CustomModal onClose={onClose} isOpen={isOpen} onSubmit={onSubmit} />
    </Stack>
  );
};

export default Posts;
