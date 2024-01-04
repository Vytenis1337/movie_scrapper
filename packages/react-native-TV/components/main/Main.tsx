import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

const Main = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My App</Text>
        <View style={styles.buttonContainer}>
          <Button title="Browse" onPress={() => console.log('Browse pressed')} />
          <Button title="Login" onPress={() => console.log('Login pressed')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default Main;