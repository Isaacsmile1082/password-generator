import { Button, useColorMode } from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);
  return (
    <header>
      <Button onClick={toggleColorMode}>Toggle color</Button>
    </header>
  );
}

export default App;
