import { Container, Flex, Text } from '@chakra-ui/react';

function HomeLayout({ children }) {
  return (
    <>
      <Flex
        px={4}
        h="64px"
        borderBottom="thin solid rgba(0,0,0,.12)"
        as="header"
        align="center"
        backgroundColor="#f5f5f5"
      >
        <Text fontSize="xl">Random User Table</Text>
      </Flex>
      <Container as="main" py={{ base: 6, md: 10 }} maxW="container.xl">
        {children}
      </Container>
    </>
  );
}

export default HomeLayout;
