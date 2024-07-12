// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';
import Favorites from '../components/Favorites';
import SplashScreen from '../components/SplashScreen';
import { FavoriteProvider } from '../context/FavoriteContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Remove the header
    }}
  >
    <Stack.Screen name="PokemonList" component={PokemonList} />
    <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // Remove the header
    }}
  >
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorites') {
          iconName = 'heart';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#fda085',
      inactiveTintColor: '#666',
    }}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Favorites" component={FavoritesStack} />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <FavoriteProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  </FavoriteProvider>
);

export default AppNavigator;
