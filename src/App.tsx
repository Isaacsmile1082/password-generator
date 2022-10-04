import {
  Box,
  Center,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Header } from "./components/Header";

function App() {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <div>
      <Header />
      <Center>
        <VStack spacing={6}>
          <Heading as="h1" size="sm">
            Password generator
          </Heading>
          <Box backgroundColor={bg} p="3" rounded="md" minW="300px">
            <Text fontSize={"2xl"}>D8saz@dadsa.</Text>
          </Box>
        </VStack>
      </Center>
    </div>
  );
}

export default App;
