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
        padding="5"
        justifyContent="center"
        alignItems="center"
        borderRadius="20"
        bg={colorMode === "light" ? "gray.100" : "gray.900"}
        zIndex="2"
      >
        <ModalHeader fontSize="3xl">New Coffee</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleCoffeeSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" />
            </FormControl>
            <FormControl>
              <FormLabel>Year</FormLabel>
              <Input type="number" name="year" />
            </FormControl>
            <FormControl>
              <FormLabel>Caffeine</FormLabel>
              <Input type="number" name="caffeine" />
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
      </ModalContent>
    </Modal>
  );

  return <>{variant === "coffee" ? newCoffeeModal : newPostModal}</>;
};
