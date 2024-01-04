import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import newRequest from '../utility/newRequest';
import axios from 'axios';

const Library = ({props, user, navigation}: any) => {
  const [movies, setMovies] = useState<any>([]);

  console.log('movies is', movies);
  console.log(user);

  // Define a function that fetches the movie data from the backend server
  const fetchMovies = async () => {
    try {
      // Fetch the /library endpoint from the backend server
      const response = await newRequest.get(`/library?userId=${user.id}`);
      // Set the movie data array to the response data
      setMovies(response.data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  // Use the useEffect hook to fetch the movie data when the component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  const deleteMovie = async (id: any) => {
    try {
      // send a delete request to the server with the movie id
      const response = await newRequest.delete(`/library/${id}`);

      // check the status code of the response
      if (response.status === 200) {
        // alert the success message if deleted
        setMovies((prevMovies: any[]) =>
          prevMovies.filter(movie => movie._id !== id),
        );
        // console.log(movies);
        console.log('success');
      } else {
        // alert the error message if not deleted
        Alert.alert('Something went wrong');
      }
    } catch (error: any) {
      // alert the error message if something goes wrong
      Alert.alert(error.message);
    }
  };

  const loggedIn = user.email;
  const initials = loggedIn.substring(0, 2);

  // Define a function that renders each movie item
  const renderMovieItem = ({item}: any) => {
    return (
      <View style={{padding: 10, borderBottomWidth: 1}}>
        {item ? (
          <Image
            style={{width: 150, height: 200}}
            source={{uri: item.posterUrl}}
          />
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
        <Text style={{fontSize: 18, color: 'black'}}>{item.title}</Text>
        <Text style={{fontSize: 14, color: 'black'}}>{item.year}</Text>
        <View style={{width: 150}}>
          <Button title="Delete" onPress={() => deleteMovie(item._id)} />
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/14213114/pexels-photo-14213114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      }}
      style={styles.background}>
      <View style={styles.top}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loggedIn}>Loged in as: {initials}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        extraData={movies}
        keyExtractor={(item: any) => item.title}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  top: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    backgroundColor: '#FFFF4D',
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
    gap: 100,
    flexDirection: 'row',
  },
  libraryButton: {
    color: 'black',
    fontSize: 20,
  },
  loggedIn: {
    color: 'black',
  },
});
export default Library;
