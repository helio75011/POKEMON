// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000); // Change this duration to the desired splash screen duration
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo-pokemon.png')} style={styles.logo} />
      <Text style={styles.text}>Welcome to Pokémon App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6d365',
  },
  logo: {
    width: 200,
    height: 200,
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
