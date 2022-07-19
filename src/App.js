import React, { useEffect, useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import Orders from './components/orders';
function App() {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // fetch customers list
  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/zaxgit/dummy-json/customers`)
      .then(res => {
        if (!res.ok) {
          throw new Error`Error 404`();
        }
        return res.json();
      })
      .then(jsonCustomers => {
        setCustomers(jsonCustomers);
        setError(false);
      })
      .catch(err => {
        setError(err.message);
        setCustomers(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const dataReady = !loading && customers;

  if (dataReady)
    return (
      <Flex justify="space-around" flexWrap="wrap" bg="white" p="10">
        {customers.map(c => {
          return (
            <Box
              key={c.id}
              padding="1"
              marginTop="5"
              marginBottom="5"
              borderRadius="10"
              minHeight="100"
              bgColor="#141414"
              color="#f3f3f3"
            >
              <Text
                bg="#f3f3f3"
                color="#141414"
                fontWeight="bold"
                p="3"
                borderRadius="10"
              >
                {c.name}
              </Text>
              <Orders id={c.id} key={c.id} />
            </Box>
          );
        })}
      </Flex>
    );

  return null;
}

export default App;
