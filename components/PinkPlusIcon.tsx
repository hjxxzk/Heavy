import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PinkPlusIcon({ size = 28 }) {
  return (
    <View style={[styles.icon, { width: size, height: size, borderRadius: size / 5 }]}>
      <Text style={styles.plus}>+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: '#f64981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '500',
    marginTop: -5,
  },
});
