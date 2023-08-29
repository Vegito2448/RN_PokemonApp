import { useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<PokemonFull>({} as PokemonFull);
  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonFull>(`pokemon/${id}`);
    setPokemonData(resp.data);
    setIsLoading(false);
  };
  useEffect(() => {
    loadPokemon();
  }, []);

  return ({
    isLoading,
    pokemonData,
  });
};

export default usePokemon;
