import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorValue } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import HomeScreen from '../screens/HomeScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemon: SimplePokemon; color?: ColorValue; };
};

const Stack = createStackNavigator<RootStackParams>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}
