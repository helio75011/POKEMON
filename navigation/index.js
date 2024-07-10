// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerShown: false, // Hide header to show gradient background
        }}
      >
        <Stack.Screen name="PokemonList" component={PokemonList} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
