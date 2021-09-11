import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { Button } from "./Components/Button";

export const theme = extendTheme({
  colors: {
    ...colors,
  },
  components: {
    Button,
  },
  fonts: {
    Heading: "Rubik",
    body: "Rubik",
  },
});
