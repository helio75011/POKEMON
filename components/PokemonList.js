// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from './GradientBackground';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke) => {
            const pokeDetails = await axios.get(poke.url);
            return { name: poke.name, imageUrl: pokeDetails.data.sprites.front_default, url: poke.url };
          })
        );
        setPokemon(pokemonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <GradientBackground>
      <FlatList
        data={pokemon}
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
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
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

export default PokemonList;
