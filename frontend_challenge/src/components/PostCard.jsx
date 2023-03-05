import { Stack, Text, Image, useColorMode, Divider } from "@chakra-ui/react";
import { usePostStore } from "../store";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";

const PostCard = ({ id }) => {
  const { postList } = usePostStore();
  const { colorMode } = useColorMode();
  const post = postList.find((p) => p.id === id);
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
    <Stack display="flex" alignItems="center" padding="20px" textAlign="center">
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
      <Divider
        borderColor={colorMode === "light" ? "brown" : "cyan"}
        size="100"
        variant="dashed"
        paddingTop="30px"
      />
    </Stack>
  );
};

export default PostCard;
