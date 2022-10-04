import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Flex, useColorMode } from "@chakra-ui/react";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Flex justify="end" p="2">
        <Button onClick={toggleColorMode} size="sm" variant="outline">
          {colorMode !== "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </header>
  );
};
