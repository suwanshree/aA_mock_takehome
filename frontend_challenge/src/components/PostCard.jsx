import { Stack, Text, Image, useColorMode, Divider } from "@chakra-ui/react";
import { usePostStore, useCoffeeStore } from "../store";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";

const PostCard = ({ id }) => {
  const { postList } = usePostStore();
  const { coffeeList } = useCoffeeStore();
  const { colorMode } = useColorMode();
  const post = postList.find((p) => p.id === id);
  const postCoffee = coffeeList.find((c) => c.id === post.coffee);
  const ratingStars = {
    size: 30,
    count: 5,
    isHalf: false,
    value: post?.rating,
    color: "gray",
    edit: false,
    activeColor: null,
  };
  console.log(post);
  return (
    <Stack display="flex" alignItems="center" padding="10px" textAlign="center">
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
        {postCoffee.name} - {Math.floor(postCoffee.caffinePercentage)} mg per oz
      </Text>
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
