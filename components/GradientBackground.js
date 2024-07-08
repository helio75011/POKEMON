// src/components/GradientBackground.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#f6d365', '#fda085']}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default GradientBackground;
