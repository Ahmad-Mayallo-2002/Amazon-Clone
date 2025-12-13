import { Spinner } from "@chakra-ui/react";

interface Dimensions {
  w: string | number;
  h: string | number;
}

export default function MainSpinner({ w, h }: Dimensions) {
  return (
    <>
      <Spinner
        w={w}
        h={h}
        borderWidth={7}
        animationDuration="700ms"
        borderColor="orange orange transparent transparent"
      />
    </>
  );
}
