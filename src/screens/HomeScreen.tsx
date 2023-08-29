import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../components/PokemonCard';
import usePokemonPaginated from '../hooks/usePokemonPaginated';
import { styles } from '../theme/appTheme';
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();

  return (
    <View>
      <Image
        source={require('../assets/images/pokebola.png')}
        style={{
          ...styles.pokeBallBG,
        }}
      />


      <View
        style={{
          // ...styles.globalMargin,
          alignItems: 'center',
        }}
      >
        <FlatList
          scrollEnabled={true}

          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pokemon }) => (
            <PokemonCard pokemon={pokemon} />
          )}
          numColumns={2}
          ListHeaderComponent={<Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              top: top + 20,
              marginBottom: top + 20,
            }}
          >
            PokeDex
          </Text>}
          // Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator
              style={{
                height: 100,
              }}
              size={20}
              color="grey"
            />}
        />
      </View>

    </View>
  );
};

export default HomeScreen;
