// src/components/GradientBackground.js
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#f6d365', '#fda085']}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
});

export default GradientBackground;