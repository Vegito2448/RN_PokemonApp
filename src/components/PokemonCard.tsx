import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ImageColorsResult, getColors } from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
interface Props {
  pokemon: SimplePokemon;
}

const { width: windowWidth } = Dimensions.get('window');
const PokemonCard = ({ pokemon }: Props) => {
  const { navigate } = useNavigation();
  const { picture } = pokemon;
  const [bgColor, setBgColor] = useState<SimplePokemon['color']>('#ccc');
  const isMounted = useRef(true);
  useEffect(() => {
    getColors(picture, {
      fallback: '#ccc',
      cache: true,
      key: picture,
    }).then((colors: ImageColorsResult) => {
      if (!isMounted.current) { return; }
      const { platform } = colors;
      if (platform === 'android') {
        setBgColor(colors.dominant);
      } else if (platform === 'ios') {
        setBgColor(colors.primary);
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, [picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('PokemonScreen', {
          pokemon,
          color: bgColor,
        });
      }}
    >
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: bgColor,
        }}
      >

        <View>
          <Text style={{
            ...styles.name,
          }}>
            {`${pokemon.name} \n# ${pokemon.id}`}
          </Text>
        </View>
        <View
          style={{
            ...styles.pokeballContainer,
          }}
        >
          <Image
            source={require('../assets/images/pokebola-blanca.png')}
            style={{ ...styles.pokeball }}
          />
        </View>
        <FadeInImage
          key={pokemon.id}
          uri={picture}
          style={{
            ...styles.pokemonImage,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;
const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: windowWidth * 0.4,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
