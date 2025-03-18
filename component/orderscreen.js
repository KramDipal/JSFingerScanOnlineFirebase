import React from 'react';
import { FlatList, Text, Button, View } from 'react-native';
import useStore from '../store';

const OrderScreenComp = () => {
  const { counts, increment, decrement } = useStore();

  // Sample data for the FlatList
  const data = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Text>{item.name} - Count: {counts[item.id] || 0}</Text>
      <Button title="+" onPress={() => increment(item.id)} />
      <Button title="-" onPress={() => decrement(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default OrderScreenComp;