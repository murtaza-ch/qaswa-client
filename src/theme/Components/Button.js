export const Button = {
  baseStyle: {
    fontWeight: "medium",
  },
  defaultProps: {
    size: "lg",
    colorScheme: "brand-orange",
  },
  variants: {
    outline: {
      _active: {
        color: "white",
        bg: "brand-orange.500",
      },
      _disabled: {
        color: "brand-orange.500",
      },
    },
  },
};
