import React from "react";
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
} from "@chakra-ui/react";

const ConfirmModal = ({
  isOpen,
  onClose,
  title,
  message,
  handleConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.500">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color="gray.500">{message}</Text>
        </ModalBody>

        <ModalFooter>
          <Button h="10" variant="ghost" mr={3} onClick={onClose}>
            NO
          </Button>
          <Button
            h="10"
            variant="ghost"
            onClick={() => handleConfirm()}
            isLoading={isLoading}
          >
            DELETE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
