import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SingleMovie = ({navigation, user}: any) => {
  const [movie, setMovie] = useState<any>(null);

  const route = useRoute();
  const {id}: any = route.params;
  const userUid = AsyncStorage.getItem('userId');

  const getUser = async () => {
    try {
      const savedUser: any = await AsyncStorage.getItem('userId');

      return savedUser;
    } catch (error) {
      console.log(error);
    }
  };
  getUser();

  useEffect(() => {
    fetch(`http://10.0.2.2:8000/api/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error(err));
  }, [id]);

  const addToLibrary = async () => {
    // create a movie object with the necessary fields

    // const addMovie = {
    //   userId: userUid,
    //   title: movie.title,
    //   posterUrl: movie.posterUrl,
    //   videoUrl: movie.videoUrl,
    //   summary: movie.summary,
    //   year: movie.year,
    //   movieId: movie.movieId,
    //   rating: movie.rating,
    //   genres: movie.genres,
    //   singleMovieId: movie._id,
    // };

    // use Axios or Fetch API to post the movie object to the library endpoint
    axios
      .post('http://10.0.2.2:8000/api/library', {
        userId: user.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        videoUrl: movie.videoUrl,
        summary: movie.summary,
        year: movie.year,
        movieId: movie.movieId,
        rating: movie.rating,
        genres: movie.genres,
        singleMovieId: movie._id,
      })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  // console.log(movie);

  return (
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {movie ? (
        <View>
          <Image
            style={{width: 150, height: 200}}
            source={{uri: movie.posterUrl}}
            //  resizeMode={'cover'} // cover or contain its upto you view look
          />
          <Text>{movie.title}</Text>
          <Text>Rating:{movie.rating}</Text>
          <Text>Year:{movie.year}</Text>
          <Button
            title="Watch Trailer"
            onPress={() => navigation.navigate('Trailer', {id: movie._id})}
          />
          <TouchableOpacity style={styles.button} onPress={addToLibrary}>
            <Text style={styles.buttonText}>Add to Library</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  poster: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SingleMovie;
