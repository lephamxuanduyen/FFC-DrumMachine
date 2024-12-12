import { Box, BoxProps } from "@chakra-ui/react"

interface Props extends BoxProps { }

export const Row = (props: Props) => <Box display={"flex"} flexDir={"row"} {...props}></Box>