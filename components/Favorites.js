// src/components/Favorites.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import GradientBackground from './GradientBackground';
import { useNavigation } from '@react-navigation/native';
import { useFavorite } from '../context/FavoriteContext';

const Favorites = () => {
  const { favoritePokemon } = useFavorite();
  const navigation = useNavigation();

  return (
    <GradientBackground>
      <View style={styles.container}>
        <FlatList
          data={favoritePokemon}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('PokemonDetails', { pokemon: item })}>
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    flex: 1,
    color: '#fff', // Set text color to white for better visibility
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default Favorites;
