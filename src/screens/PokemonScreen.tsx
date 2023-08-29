import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import PokemonDetails from '../components/PokemonDetails';
import usePokemon from '../hooks/usePokemon';
import { RootStackParams } from '../navigator/StackNavigator';
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {

}
const PokemonScreen = ({ navigation, route }: Props) => {
  const { params: { pokemon, color } } = route;
  const { id, name, picture } = pokemon;
  const { top } = useSafeAreaInsets();
  const { pokemonData, isLoading } = usePokemon(id);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Header */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}
      >
        {/* BackButton */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.pop()
          }
          style={{
            ...styles.backButton,
            top: top + 8,
            left: 8,
          }}
        >
          <Icon
            name="arrow-back-outline"
            color="white"
            size={50}
          />
        </TouchableOpacity>
        {/* Pokemon Name */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 45,
          }}
        >
          {`${name}\n#${id}`}
        </Text>
        {/* White Pokeball */}
        <Image
          source={require('../assets/images/pokebola-blanca.png')}
          style={{
            ...styles.pokeball,
          }}
        />
        <FadeInImage
          uri={picture}
          style={{
            ...styles.pokemonImage,
          }}
        />
      </View>
      {/* Details and Loading */}
      {isLoading ? <View
        style={{
          ...styles.loadingIndicator,
        }}
      >
        <ActivityIndicator
          color={color}
          size={50}
        />
      </View> : <PokemonDetails pokemon={pokemonData} />}
    </View >
  );
};

export default PokemonScreen;
const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -20,
    right: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
