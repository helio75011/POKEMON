// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';
import GradientBackground from '../components/GradientBackground';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <GradientBackground>
        <Stack.Navigator initialRouteName="PokemonList">
          <Stack.Screen name="PokemonList" component={PokemonList} options={{ title: 'Pokémon List' }} />
          <Stack.Screen name="PokemonDetails" component={PokemonDetails} options={{ title: 'Pokémon Details' }} />
        </Stack.Navigator>
      </GradientBackground>
    </NavigationContainer>
  );
};

export default AppNavigator;
