import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Movies = ({navigation, user}: any) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);
  const say = 'say';
  const loggedIn = user.email;
  const initials = loggedIn.substring(0, 2);
  return (
    <ScrollView>
      <View style={styles.container}>
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

        <View style={styles.content}>
          {movies.map((movie: any) => (
            <View style={styles.movieCard} key={movie._id}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleMovie', {id: movie._id})
                }>
                <Image
                  style={{width: 150, height: 200}}
                  source={{uri: movie.posterUrl}}
                  //  resizeMode={'cover'} // cover or contain its upto you view look
                />
              </TouchableOpacity>
              <Text style={styles.title}>{movie.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  movieCard: {
    // Adjust the width as per your design
    marginBottom: 5,
    marginTop: 5,
    marginHorizontal: 5,
    width: 150,
    // Adjust the margin as per your design
  },
  title: {
    color: 'black',
  },
});

export default Movies;
