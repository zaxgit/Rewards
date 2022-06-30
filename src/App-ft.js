import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, Text, theme } from '@chakra-ui/react';
import { filterUndefined } from '@chakra-ui/utils';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  // Set states to store loading state, data, and errors
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  // Fetch json data of customers
  useEffect(() => {
    fetch('https://my-json-server.typicode.com/zaxgit/dummy-json/orders')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error 404, data not found. (check fetch url) `);
        }
        return response.json();
      })
      .then(jsonData => {
        setOrders(jsonData);
        setError(false);
      })
      .catch(err => {
        setError(err.message);
        setOrders(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Calculate total points of totals passed as an array
  const pointCalc = trans => {
    const pointsArr = [];
    let totalPoints = 0;
    trans.forEach(n => {
      if (n > 50 && n <= 100) {
        pointsArr.push(n - 50);
      } else if (n > 100) {
        let points = n - 100;
        points = points * 2;
        points = points + 50;
        pointsArr.push(points);
      } else {
        return 'No points for this purchase';
      }
    });
    pointsArr.forEach(n => {
      totalPoints = totalPoints + n;
    });
    return totalPoints;
  };
  console.log(orders);
  if (!loading && orders) {
    orders.filter(c => c.customer);
  }

  // filter by customer id and month

  // Iterate through customers and run pointCalc() to get point totals
  return <ChakraProvider theme={theme}></ChakraProvider>;
}

export default App;
