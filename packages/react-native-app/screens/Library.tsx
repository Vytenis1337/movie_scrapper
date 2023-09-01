import React, {useEffect, useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import newRequest from '../utility/newRequest';
import axios from 'axios';

const Library = ({props, user}: any) => {
  const [movies, setMovies] = useState<any>([]);

  console.log(movies);
  console.log(user);
  console.log(props);

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

  // Define a function that renders each movie item
  const renderMovieItem = ({item}: any) => {
    console.log(item._id);
    return (
      <View style={{padding: 10, borderBottomWidth: 1}}>
        <Text style={{fontSize: 18}}>{item.title}</Text>
        <Text style={{fontSize: 14}}>{item.year}</Text>
        <Button title="Delete" onPress={() => deleteMovie(item._id)} />
      </View>
    );
  };
  return (
    <FlatList
      data={movies}
      renderItem={renderMovieItem}
      extraData={movies}
      keyExtractor={(item: any) => item.title}
    />
  );
};
const styles = StyleSheet.create({});
export default Library;
