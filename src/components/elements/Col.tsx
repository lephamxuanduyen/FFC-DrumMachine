import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps { }

export const Col = (props: Props) => <Box display={"flex"} flexDir={"column"} {...props} />