import {
  Box,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

import { Header } from "./components/Header";
import { Measurer, useMeasurer } from "./components/Measurer";

function App() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const strengthBg = useColorModeValue("blackAlpha.100", "blackAlpha.600");
  const { registerMeasure, setActiveMeasurement } = useMeasurer("medium");

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
          <Box backgroundColor={bg} p="3" rounded="md" minW="300px">
            <Flex justify="space-between">
              <Text as="h2" size="sm">
                Character length
              </Text>
              <Text fontSize="xl">10</Text>
            </Flex>
            <Slider aria-label="slider-ex-1" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <VStack align="flex-start" spacing={4}>
              <Checkbox>Include Uppercase Letters</Checkbox>
              <Checkbox>Include Lowercase Letters</Checkbox>
              <Checkbox>Include Numbers</Checkbox>
              <Checkbox>Include Symbols</Checkbox>
            </VStack>
            <Flex
              bg={strengthBg}
              mt="3"
              p="3"
              rounded="md"
              justify="space-between"
            >
              <Text alignSelf="center">STRENGTH</Text>
              <Measurer {...registerMeasure()} />
            </Flex>
            <Button
              variant="solid"
              w="100%"
              mt="3"
              rightIcon={<ArrowRightIcon />}
              colorScheme="teal"
              gap="2"
            >
              Generate
            </Button>
          </Box>
        </VStack>
      </Center>
    </div>
  );
}

export default App;
