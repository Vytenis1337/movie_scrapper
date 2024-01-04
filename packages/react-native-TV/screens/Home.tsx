import {signOut} from 'firebase/auth';
import React from 'react';
import {Button, ImageBackground, StyleSheet, Text, View} from 'react-native';
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


  const loggedIn = user.email;
  const initials = loggedIn.substring(0, 2);
  

  return (
    <ImageBackground source={{ uri: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
    style={styles.background}>
      <View style={styles.top}>
        <Text style={styles.loged}>Loged in as: {initials}</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.button}>

        <Button color='#788eec' title="Movies" onPress={() => navigation.navigate('Movies')} />

        <Button title="Sign Out" onPress={logout} />
        </View>
      </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    
    
    justifyContent: 'space-between',
    width: '100%',
      height: '100%'
  },
  top: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 10,
    
  },
  loged: {
    color: 'black'
  },
  middle: {
    flex: 2,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },

  button: {
width: 150,
gap: 10

  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
});
