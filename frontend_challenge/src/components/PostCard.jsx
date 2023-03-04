import { Stack, Text, Image, useColorMode, Divider } from "@chakra-ui/react";
import { usePostStore } from "../store";
import mug from "../assets/svgs/mug.svg";
import whiteMug from "../assets/svgs/whiteMug.svg";

const PostCard = ({ id }) => {
  const { postList } = usePostStore();
  const { colorMode } = useColorMode();
  const post = postList.find((p) => p.id === id);
  return (
    <Stack display="flex" alignItems="center" padding="20px" textAlign="center">
      <Text
        paddingRight={["0px", "30px"]}
        paddingLeft={["0px", "30px"]}
        fontSize="3xl"
      >
        {post.title}
      </Text>
      <Text
        paddingRight={["0px", "30px"]}
        paddingLeft={["0px", "30px"]}
        fontSize="2xl"
      >
        {post.rating}
      </Text>
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
