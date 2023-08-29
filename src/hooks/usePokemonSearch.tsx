import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';
const usePokemonSearch = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

  const loadPokemons = async () => {
    setIsFetching(true);

    const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1281');
    mapPokemonList(resp.data.results);


    setIsFetching(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {

    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {

      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return { id, picture, name: name.toUpperCase() };
    });

    setSimplePokemonList(prevPokemonList => [...prevPokemonList, ...newPokemonList]);
  };

  useEffect(() => {
    loadPokemons();
  }, []);




  return (
    {
      simplePokemonList,
      isFetching,
    }
  );
};

export default usePokemonSearch;
