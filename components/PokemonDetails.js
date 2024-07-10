// src/components/PokemonDetails.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import GradientBackground from './GradientBackground';

const PokemonDetails = ({ route }) => {
  const { pokemon } = route.params;
  const [details, setDetails] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(pokemon.url);
        setDetails(response.data);

        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const evolutionChain = [];
        let evoData = evolutionResponse.data.chain;

        do {
          const evoDetails = evoData['evolves_to'];
          const species = evoData.species;

          const speciesDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${species.name}`);
          evolutionChain.push({
            name: species.name,
            imageUrl: speciesDetails.data.sprites.front_default,
          });

          evoData = evoDetails.length > 0 ? evoDetails[0] : null;
        } while (evoData && evoData.hasOwnProperty('evolves_to'));

        setEvolutions(evolutionChain);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon.url]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.name}>{details.name}</Text>
        <Image source={{ uri: details.sprites.front_default }} style={styles.image} />
        <Text style={styles.info}>Base Experience: {details.base_experience}</Text>
        <Text style={styles.info}>Height: {details.height}</Text>
        <Text style={styles.info}>Weight: {details.weight}</Text>
        <Text style={styles.info}>Types: {details.types.map(type => type.type.name).join(', ')}</Text>

        <Text style={styles.evolutionTitle}>Evolutions:</Text>
        <FlatList
          data={evolutions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.evolutionItem}>
              <Image source={{ uri: item.imageUrl }} style={styles.evolutionImage} />
              <Text style={styles.evolutionName}>{item.name}</Text>
            </View>
          )}
          horizontal={true}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Set text color to white for better visibility
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: '#fff', // Set text color to white for better visibility
  },
  evolutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff', // Set text color to white for better visibility
  },
  evolutionItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  evolutionImage: {
    width: 100,
    height: 100,
  },
  evolutionName: {
    fontSize: 16,
    marginTop: 5,
    color: '#fff', // Set text color to white for better visibility
  },
});

export default PokemonDetails;
