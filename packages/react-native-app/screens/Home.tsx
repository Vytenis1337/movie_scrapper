import {signOut} from 'firebase/auth';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {auth} from '../firebase/firebase';

export default function HomeScreen({props, setUser, navigation, user}: any) {
  console.log(props);
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Loged in as: {user.email}</Text>
      </View>
      <View style={styles.middle}>
        <Button title="Movies" onPress={() => navigation.navigate('Movies')} />
        <Button title="Sign Out" onPress={logout} />
      </View>
      <View style={styles.bottom}>
        <Text>Home Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  top: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 10,
  },
  middle: {
    flex: 2,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
});
