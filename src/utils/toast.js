export const errorToastHandler = ({ toast, title, error }) => {
  return toast({
    title: title,
    description: error,
    status: "error",
    duration: 5000,
    position: "top-right",
    isClosable: true,
  });
};

export const successToastHandler = ({ toast, title, message }) => {
  return toast({
    title: title,
    description: message,
    status: "success",
    duration: 5000,
    position: "top-right",
    isClosable: true,
  });
};
