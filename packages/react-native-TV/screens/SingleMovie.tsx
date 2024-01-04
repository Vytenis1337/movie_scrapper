import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SingleMovie = ({navigation, user}: any) => {
  const [movie, setMovie] = useState<any>(null);

  const route = useRoute();
  const {id}: any = route.params;

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
  const loggedIn = user.email;
  const initials = loggedIn.substring(0, 2);
  return (
    <>
      <View style={styles.top}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Library')}>
            <Text style={styles.libraryButton}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loggedIn}>Loged in as: {initials}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {movie ? (
        <ImageBackground
          source={{uri: movie.posterUrl}}
          style={styles.background}>
          <View>
            <Image
              style={{width: 150, height: 200}}
              source={{uri: movie.posterUrl}}
              //  resizeMode={'cover'} // cover or contain its upto you view look
            />
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>Rating:{movie.rating}</Text>
            <Text style={styles.year}>Year:{movie.year}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Trailer', {id: movie._id})}>
              <Text style={styles.buttonText}>Watch Trailer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addToLibrary}>
              <Text style={styles.buttonText}>Add to Library</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,

    justifyContent: 'space-between',
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
    color: '#f1c40f',
  },
  rating: {
    fontSize: 16,
    color: '#f1c40f',
  },
  year: {
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
