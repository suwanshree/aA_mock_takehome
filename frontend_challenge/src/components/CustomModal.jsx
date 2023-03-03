import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useColorMode,
} from "@chakra-ui/react";

export const CustomModal = ({
  onClose,
  isOpen,
  onSubmit,
  modalTitle,
  modalDescription,
}) => {
  const { colorMode } = useColorMode();
  return (
    <>
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
          <ModalHeader fontSize="3xl">{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalDescription}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
