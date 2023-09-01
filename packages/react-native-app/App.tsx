/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Main from './components/main/Main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Movies from './screens/Movies';
import Login from './screens/Login';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth, db} from './firebase/firebase';
import Register from './screens/Register';
import SingleMovie from './screens/SingleMovie';
import Library from './screens/Library';
import Trailer from './screens/Trailer';
import Home from './screens/Home';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function LoggedIn() {
//   const logout = async () => {
//     try {
//       await signOut(auth);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Logged in</Text>
//       <Button title="Log out" onPress={logout} />
//     </View>
//   );
// }

// const window = useWindowDimensions();
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [screen, setScreen] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  if (loading) {
    return <></>;
  }

  useEffect(() => {
    const usersRef = db.collection('users');
    auth.onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then(document => {
            const userData: any = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch(error => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  // onAuthStateChanged(auth, user => {
  //   if (user) {
  //     setLoggedIn(true);
  //   } else {
  //     setLoggedIn(false);
  //   }
  // });
  // console.log(movies);

  // const getScreen = () => {
  //   if (loggedIn)
  //     return (
  //       <>
  //         <LoggedIn />
  //         <Movies />
  //       </>
  //     );
  //   if (screen === 'signup') return <Register setScreen={setScreen} />;
  //   return <Login setScreen={setScreen} />;
  // };

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {props => (
              <Home {...props} extraData={user} setUser={setUser} user={user} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="SingleMovie">
            {props => <SingleMovie {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Library">
            {props => <Library {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Trailer" component={Trailer} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  container: {
    flex: 1,

    backgroundColor: '#ff8c00',
    // justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 20,
    color: '#ff8c00',
    justifyContent: 'space-around',
    width: '50%',
  },
});

export default App;
