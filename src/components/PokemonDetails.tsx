import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import addDecimalPoint from '../helpers/addDecimalPoint';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';
interface Props {
  pokemon: PokemonFull;
}
const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'red',
      }}
    >

      <View
        style={{
          ...styles.container,
          flex: 1,
          marginTop: 370,
        }}
      >
        <Text
          style={{
            ...styles.title,
          }}>
          PokemonDetails
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >{
            pokemon.types.map(({ type }) =>
              <Text
                key={type.url}
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                }}
              >
                {type.name}
              </Text>
            )
          }
        </View>
        <Text
          style={{
            ...styles.title,
          }}>
          Weight
        </Text>
        <Text
          style={{
            ...styles.title,
          }}>
          {addDecimalPoint(pokemon.weight)} Kg
        </Text>
      </View>
      <View style={{
        ...styles.container,
        marginTop: 20,
      }}>
        <Text
          style={{
            ...styles.title,
          }}
          children="Sprites"
        />
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <FadeInImage uri={pokemon.sprites.front_default}
          style={{
            ...styles.basicSprite,
          }}
        />
        <FadeInImage uri={pokemon.sprites.back_default}
          style={{
            ...styles.basicSprite,
          }}
        />
        <FadeInImage uri={pokemon.sprites.front_shiny}
          style={{
            ...styles.basicSprite,
          }}
        />
        <FadeInImage uri={pokemon.sprites.back_shiny}
          style={{
            ...styles.basicSprite,
          }}
        />
      </ScrollView>
      <View
        style={{
          ...styles.container,
        }}
      >
        <Text
          style={{
            ...styles.title,
          }}>
          Base Abilities
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >{
            pokemon.abilities.map(({ ability }) =>
              <Text
                key={ability.url}
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                }}
              >
                {ability.name}
              </Text>
            )
          }
        </View>
      </View>
      <View
        style={{
          ...styles.container,
        }}
      >
        <Text
          style={{
            ...styles.title,
          }}>
          Moves
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >{
            pokemon.moves.map(({ move }) =>
              <Text
                key={move.url}
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                }}
              >
                {move.name}
              </Text>
            )
          }
        </View>
      </View>
      <View
        style={{
          ...styles.container,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text
          style={{
            ...styles.title,
          }}>
          Stats
        </Text>
        <View>
          {
            pokemon.stats.map(({ stat, base_stat }, index) =>
              <View
                key={stat.url + index}
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    ...styles.regularText,
                    marginRight: 10,
                    width: 150,
                  }}
                >
                  {stat.name}
                </Text>
                <Text
                  key={stat.url}
                  style={{
                    ...styles.regularText,
                    marginRight: 10,
                    fontWeight: 'bold',
                  }}
                >
                  {base_stat}
                </Text>
              </View>
            )
          }
        </View>
        <View
          style={{
            marginBottom: 20,
            alignItems: 'center',
          }}
        >
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={{
              ...styles.basicSprite,
            }}
          />
        </View>
      </View>

    </ScrollView >
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },

});
