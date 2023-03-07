import {
  Stack,
  Text,
  useColorMode,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { usePostStore, useCoffeeStore } from "../store";
import ReactStars from "react-rating-stars-component";
import { CloseIcon } from "@chakra-ui/icons";

const PostCard = ({ id }) => {
  const { postList, isCoffeeSelected, deletePost } = usePostStore();
  const { coffeeList } = useCoffeeStore();
  const { colorMode } = useColorMode();
  const post = postList?.find((p) => p.id === id);
  const postCoffee = coffeeList?.find((c) => c.id === post.coffee);
  const handleDelete = (event) => {
    event.preventDefault();
    deletePost(post.id);
  };
  const ratingStars = {
    size: 30,
    count: 5,
    isHalf: false,
    value: post?.rating,
    color: "gray",
    edit: false,
    activeColor: null,
  };
  return (
    <Stack
      display="flex"
      alignItems="center"
      textAlign="center"
      position="relative"
      _hover={{
        boxShadow: `0px 1px 1px rgba(${
          colorMode === "light" ? "121, 71, 38" : "0, 188, 212"
        }, 0.40)`,
        "& > button": {
          visibility: "visible",
        },
      }}
    >
      <Text
        paddingRight={["0px", "30px"]}
        paddingLeft={["0px", "30px"]}
        fontSize="3xl"
      >
        {post.title}
      </Text>
      <ReactStars {...ratingStars} />
      <Text
        paddingRight={["0px", "30px"]}
        paddingLeft={["0px", "30px"]}
        fontSize="xl"
      >
        {post.text}
      </Text>
      <Text
        paddingRight={["0px", "30px"]}
        paddingLeft={["0px", "30px"]}
        paddingTop={["10px", "20px"]}
        fontSize="xl"
        fontWeight="bold"
      >
        {postCoffee?.name} - {Math.floor(postCoffee?.caffinePercentage)} mg per
        oz
      </Text>
      {isCoffeeSelected ? null : (
        <IconButton
          position="absolute"
          top="5px"
          right="5px"
          aria-label="Remove Coffee"
          icon={<CloseIcon />}
          visibility="hidden"
          onClick={handleDelete}
        />
      )}
      <Divider
        borderColor={colorMode === "light" ? "brown" : "cyan"}
        size="100"
        variant="dashed"
        paddingTop="10px"
      />
    </Stack>
  );
};

export default PostCard;
