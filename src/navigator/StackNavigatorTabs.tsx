import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorValue } from 'react-native';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import PokemonScreen from '../screens/PokemonScreen';
import SearchScreen from '../screens/SearchScreen';

export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: { pokemon: SimplePokemon; color?: ColorValue; };
};

const Stack = createStackNavigator<RootStackParams>();

export default function StackNavigatorTabs() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="HomeScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
}
