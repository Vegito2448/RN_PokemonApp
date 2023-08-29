
import { useEffect, useState } from 'react';
import React, { Dimensions, FlatList, Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import SearchInput from '../components/SearchInput';
import usePokemonSearch from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { styles as globalStyles } from '../theme/appTheme';
const { width: screenWidth } = Dimensions.get('window');

const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, simplePokemonList } = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>();
  const [term, setTerm] = useState('');


  useEffect(() => {
    if (term.length === 0) { return setPokemonFiltered([]); }


    if (isNaN(Number(term))) {
      setPokemonFiltered(
        simplePokemonList.filter(
          pokemon => pokemon.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {

      const pokemonById = simplePokemonList.find(pokemon => pokemon.id === term);
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }


  }, [term]);

  if (isFetching) {
    return Loading();
  }


  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? top : top + 10,
        marginHorizontal: 20,
      }}
    >
      <SearchInput
        onDebounce={(value) => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
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

          data={pokemonFiltered}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: pokemon }) => (
            <PokemonCard pokemon={pokemon} />
          )}
          numColumns={2}
          ListHeaderComponent={<Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
            }}
          >
            {term}
          </Text>}
          // Infinite Scroll
          onEndReachedThreshold={0.4}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

