import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const showErrorMsg = msg => <Text style={styles.txt}>{msg}</Text>;

export const showSuccessMsg = msg => <Text style={styles.txt}>{msg}</Text>;

const styles = StyleSheet.create({
  txt: {
    color: '#ff0000',
    fontSize: 20,
  },
});
