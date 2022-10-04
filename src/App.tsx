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
  CheckboxGroup,
  Alert,
  AlertDescription,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { ArrowRightIcon } from "@chakra-ui/icons";

import { Header } from "./components/Header";
import { Measurer, useMeasurer } from "./components/Measurer";
import { useEffect, useState } from "react";
import { getPassword } from "./utils/password";

export type Inputs = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};
type EnumOptions = "uppercase" | "lowercase" | "numbers" | "symbols";
type valuesCheckboxGroup = [EnumOptions];

function App() {
  const bg = useColorModeValue("gray.100", "gray.700");
  const strengthBg = useColorModeValue("blackAlpha.100", "blackAlpha.600");
  const { registerMeasure, setActiveMeasurement } = useMeasurer("medium");

  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      length: 10,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    },
  });
  const [password, setPassword] = useState("");
  const [isCheckBoxGroupEmpty, setIsCheckBoxGroupEmpty] = useState(false);
  const [errors, setErrors] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const handleGeneratePassword = async () => {
    if (isCheckBoxGroupEmpty) {
      setIsCheckBoxGroupEmpty(true);
      return;
    }
    const options = watch();
    setLoading(true);
    try {
      const newPassword = await getPassword(options);
      setPassword(newPassword);
    } catch (error) {
      setErrors("Unexpected error");
    }
    setLoading(false);
  };

  const handleSetActiveMeasurement = (activeValues: valuesCheckboxGroup) => {
    if (activeValues.length < 1) {
      setIsCheckBoxGroupEmpty(true);
      return;
    }
    setIsCheckBoxGroupEmpty(false);
    activeValues.length > 3
      ? setActiveMeasurement(() => 2)
      : activeValues.length <= 3 && activeValues.length > 1
      ? setActiveMeasurement(() => 1)
      : setActiveMeasurement(0);
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  return (
    <div>
      <Header />
      <Center>
        <VStack spacing={6}>
          <Heading as="h1" size="sm">
            Password generator
          </Heading>
          {errors && (
            <Alert variant="solid" status="error">
              <AlertDescription>{errors}</AlertDescription>
            </Alert>
          )}
          <Box backgroundColor={bg} p="3" rounded="md" minW="300px">
            <Text fontSize={"2xl"}>
              {loading ? <Spinner size="md" /> : password}
            </Text>
          </Box>
          <Box backgroundColor={bg} p="3" rounded="md" minW="300px">
            <Flex justify="space-between">
              <Text as="h2" size="sm">
                Character length
              </Text>
              <Text fontSize="xl">{watch("length")}</Text>
            </Flex>
            <Text fontSize="sm" color="red.400">
              {isCheckBoxGroupEmpty && "Add at least one condition"}
            </Text>
            <Slider
              aria-label="slider-ex-1"
              min={4}
              max={12}
              defaultValue={10}
              onChange={(val) => setValue("length", val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <CheckboxGroup
              onChange={handleSetActiveMeasurement}
              defaultValue={["uppercase"]}
            >
              <VStack align="flex-start" spacing={4}>
                <Checkbox value="uppercase" {...register("uppercase")}>
                  Include Uppercase Letters
                </Checkbox>
                <Checkbox value="lowercase" {...register("lowercase")}>
                  Include Lowercase Letters
                </Checkbox>
                <Checkbox value="number" {...register("numbers")}>
                  Include Numbers
                </Checkbox>
                <Checkbox value="symbols" {...register("symbols")}>
                  Include Symbols
                </Checkbox>
              </VStack>
            </CheckboxGroup>
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
              onClick={handleGeneratePassword}
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
