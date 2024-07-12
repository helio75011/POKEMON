// src/components/PokemonList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from './GradientBackground';
import { useFavorite } from '../context/FavoriteContext';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [generations, setGenerations] = useState([]);
  const navigation = useNavigation();
  const { favoritePokemon, addFavorite, removeFavorite } = useFavorite();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = await Promise.all(
          response.data.results.map(async (poke) => {
            const pokeDetails = await axios.get(poke.url);
            const speciesDetails = await axios.get(pokeDetails.data.species.url);
            return {
              name: poke.name,
              imageUrl: pokeDetails.data.sprites.front_default,
              url: poke.url,
              types: pokeDetails.data.types.map(type => type.type.name),
              generation: speciesDetails.data.generation.name,
            };
          })
        );
        setPokemon(pokemonData);
        setFilteredPokemon(pokemonData);
        const allTypes = Array.from(new Set(pokemonData.flatMap(p => p.types)));
        setTypes(allTypes);
        const allGenerations = Array.from(new Set(pokemonData.map(p => p.generation)));
        setGenerations(allGenerations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (text) => {
    setSearch(text);
    filterPokemon(text, selectedType, selectedGeneration);
  };

  const handleFilterByType = (type) => {
    const newType = selectedType === type ? null : type;
    setSelectedType(newType);
    filterPokemon(search, newType, selectedGeneration);
  };

  const handleFilterByGeneration = (generation) => {
    const newGeneration = selectedGeneration === generation ? null : generation;
    setSelectedGeneration(newGeneration);
    filterPokemon(search, selectedType, newGeneration);
  };

  const filterPokemon = (searchText, type, generation) => {
    let filteredData = pokemon;
    if (searchText) {
      filteredData = filteredData.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (type) {
      filteredData = filteredData.filter((item) => item.types.includes(type));
    }
    if (generation) {
      filteredData = filteredData.filter((item) => item.generation === generation);
    }
    setFilteredPokemon(filteredData);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokémon"
          value={search}
          onChangeText={handleSearch}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {types.map((type) => (
            <TouchableOpacity key={type} style={[styles.filterButton, selectedType === type && styles.selectedFilterButton]} onPress={() => handleFilterByType(type)}>
              <Text style={styles.filterText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {generations.map((generation) => (
            <TouchableOpacity key={generation} style={[styles.filterButton, selectedGeneration === generation && styles.selectedFilterButton]} onPress={() => handleFilterByGeneration(generation)}>
              <Text style={styles.filterText}>{generation.replace('generation-', 'Gen ')}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={filteredPokemon}
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
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f6d365',
    marginRight: 10,
  },
  selectedFilterButton: {
    backgroundColor: '#fda085',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
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

export default PokemonList;
