import React, { useState, useEffect } from 'react';
import { Box, Text, Flex, Spacer, Tag } from '@chakra-ui/react';

const Orders = props => {
  const [orders, setOrders] = useState(null);
  const [orderTotals, setOrderTotals] = useState(null);
  const [monthlyOrders, setMonthlyOrders] = useState(null);

  useEffect(() => {
    fetch('https://my-json-server.typicode.com/zaxgit/dummy-json/orders')
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error 404`);
        }
        return res.json();
      })
      .then(jsonOrders => {
        const orders = [];
        const trans = [];
        const monthlyTrans = [];
        jsonOrders.map(jo => {
          if (jo.customer === props.id) {
            const month = new Date(jo.date).getMonth() + 1;
            trans.push(jo.total);
            monthlyTrans.push({ month: month, total: jo.total });
            orders.push(jo);
          }
        });
        setOrders(orders);
        setOrderTotals(trans);
        setMonthlyOrders(groupBy(monthlyTrans, 'month'));
      })
      .catch(err => {
        new Error(err.message);
        setOrderTotals(null);
        setMonthlyOrders(null);
      });
  }, []);

  const pointCalc = transArr => {
    const pointsArr = [];
    let totalPoints = 0;
    transArr.forEach(n => {
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

  const groupBy = (objArr, property) => {
    return objArr.reduce((acc, obj) => {
      let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, []);
  };

  const textMonth = n => {
    switch (n) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        break;
    }
  };

  const dataReady = orders && orderTotals && monthlyOrders;

  if (dataReady)
    return (
      <Box p="3">
        <Box p="2">
          <Text fontWeight="bold" pb="1">
            ORDERS
          </Text>
          {orders.map(o => {
            return (
              <Flex p="2">
                <Tag>{o.id}</Tag>
                <Spacer />
                <Text>{o.date}</Text>
                <Spacer />
                <Text>${o.total}</Text>
              </Flex>
            );
          })}
        </Box>
        <Box p="2">
          <Text fontWeight="bold" pb="1">
            POINT TOTALS
          </Text>
          <Flex>
            <Box>
              <Text>Total points</Text>
              <Text p="2">{pointCalc(orderTotals)}</Text>
            </Box>
            <Spacer minWidth="10" />
            <Box>
              <Text>Points per month</Text>
              {monthlyOrders.map(mt => {
                const monthlyTrans = [];
                mt.forEach(t => {
                  monthlyTrans.push(t.total);
                });
                return (
                  <Flex p="2">
                    <Text>{textMonth(mt[0].month)}</Text>
                    <Spacer />
                    <Text>{pointCalc(monthlyTrans)}</Text>
                  </Flex>
                );
              })}
            </Box>
          </Flex>
        </Box>
      </Box>
    );
};

export default Orders;
