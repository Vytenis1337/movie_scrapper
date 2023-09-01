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

const Movies = ({navigation}: any) => {
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
  return (
    <ScrollView>
      <View style={styles.content}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
        <Button
          title="Library"
          onPress={() => navigation.navigate('Library')}
        />
        {/* <TextInput
    placeholder="Email"
    value={email}
    onChangeText={(text) => setEmail(text)}
    style={{padding: 10, marginBottom: 10}}
  />
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={(text) => setPassword(text)}
    secureTextEntry
    style={{padding: 10, marginBottom: 10}}
  />
  <Button
    title="Login"
    color="orange"
    onPress={handleLogin}
  /> */}
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
            <Text>{movie.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  movieCard: {
    // Adjust the width as per your design
    marginBottom: 10, // Adjust the margin as per your design
  },
});

export default Movies;
