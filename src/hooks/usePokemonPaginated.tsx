import { useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';
const usePokemonPaginated = () => {
  const [loading, setLoading] = useState(false);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);
  const nextPageUrl = useRef('pokemon?limit=40&offset=0');

  const loadPokemons = async () => {
    setLoading(true);

    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;
    mapPokemonList(resp.data.results);


    setLoading(false);
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
      loadPokemons,
      loading,
    }
  );
};

export default usePokemonPaginated;
