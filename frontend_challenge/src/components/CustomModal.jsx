import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Select,
  Textarea,
} from "@chakra-ui/react";

export const CustomModal = ({ onClose, isOpen, onSubmit, variant }) => {
  const { colorMode } = useColorMode();

  const handleCoffeeSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const year = event.target.elements.year.value;
    const caffeine = event.target.elements.caffeine.value;
    console.log(`New coffee: ${name} (${year}), caffeine: ${caffeine}`);
    onClose();
    onSubmit();
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    onClose();
    onSubmit();
  };

  const newCoffeeModal = (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(10px)" zIndex="1" />
      <ModalContent
        flexDir="column"
        padding="2"
        justifyContent="center"
        alignItems="center"
        borderRadius="20"
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
        zIndex="2"
      >
        <ModalHeader fontSize="3xl">New Coffee</ModalHeader>
        <ModalCloseButton />
        <Divider
          borderColor={colorMode === "light" ? "brown" : "cyan"}
          size="100"
        />
        <form onSubmit={handleCoffeeSubmit}>
          <ModalBody>
            <FormControl display="flex" alignItems="center" marginTop="20px">
              <FormLabel>Name:</FormLabel>
              <Input type="text" name="name" width="250px" marginLeft="40px" />
            </FormControl>
            <FormControl display="flex" alignItems="center" marginTop="20px">
              <FormLabel>Year:</FormLabel>
              <Input
                type="number"
                name="year"
                width="250px"
                marginLeft="54px"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" marginTop="20px">
              <FormLabel>Caffine:</FormLabel>
              <Input
                type="number"
                name="caffeine"
                width="250px"
                marginLeft="35px"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button type="submit">Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  const newPostModal = (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(10px)" zIndex="1" />
      <ModalContent
        flexDir="column"
        padding="5"
        justifyContent="center"
        alignItems="center"
        borderRadius="20"
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
        zIndex="2"
      >
        <ModalHeader fontSize="3xl">New Post</ModalHeader>
        <ModalCloseButton />
        <Divider
          borderColor={colorMode === "light" ? "brown" : "cyan"}
          size="100"
        />

        <form onSubmit={handlePostSubmit}>
          <ModalBody>
            <FormControl marginTop="20px">
              <Input
                type="text"
                name="title"
                width="100%"
                placeholder="Title"
              />
            </FormControl>
            <FormControl marginTop="20px">
              <Input
                type="number"
                name="rating"
                width="100%"
                placeholder="Rating"
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" marginTop="20px">
              <FormLabel>Coffee:</FormLabel>
              <Select name="coffee" width="200px" marginLeft="34px">
                <option value="columbian">Columbian</option>
                <option value="ethiopian">Ethiopian</option>
                <option value="guatemalan">Guatemalan</option>
              </Select>
            </FormControl>
            <FormControl>
              <Textarea
                name="text"
                width="100%"
                placeholder="Post Text"
                marginTop="20px"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button type="submit">Submit</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );

  return <>{variant === "coffee" ? newCoffeeModal : newPostModal}</>;
};
