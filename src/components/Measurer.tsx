import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type measurerType = "easy" | "medium" | "strong";

const measurement = ["easy", "medium", "strong"];

interface IMeasurer {
  activeMeasurement: number;
}

export const useMeasurer = (measurerState: measurerType) => {
  const [activeMeasurement, setActiveMeasurement] = useState<number>(
    measurement.indexOf(measurerState)
  );

  const registerMeasure = () => ({
    activeMeasurement,
  });

  return {
    registerMeasure,
    setActiveMeasurement,
  };
};

export const Measurer = ({ activeMeasurement }: IMeasurer) => {
  return (
    <Flex>
      <Text casing={"uppercase"} alignSelf="center" mr="3">
        {measurement[activeMeasurement]}
      </Text>
      <HStack spacing={3} flexDir="row">
        {measurement.map((e, i) => (
          <Box
            minH="10"
            bg={activeMeasurement >= i ? "yellow.600" : "blackAlpha.800"}
            rounded="sm"
            minW="3"
          ></Box>
        ))}
      </HStack>
    </Flex>
  );
};
