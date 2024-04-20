import { useState } from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiBaseUrl } from '../../config/constants';
import { Pokemon, PokemonListResponse } from '../../config/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: builder => ({
    fetchPokemons: builder.query<PokemonListResponse, { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 10 }) => `/pokemon/?offset=${offset}&limit=${limit}`,
    }),
    fetchPokemonById: builder.query<Pokemon, string>({
      query: id => `/pokemon/${id}`,
      transformResponse: (response: any): Pokemon => ({
        name: response.name,
        height: response.height,
        weight: response.weight,
        sprites: {
          front_default: response.sprites.front_default,
        },
        types: response.types.map((item: any) => item.type.name),
      }),
    }),
  }),
});

export const { useFetchPokemonsQuery, useFetchPokemonByIdQuery } = pokemonApi;

export const usePokemons = (limit = 10) => {
  const [offset, setOffset] = useState(0);
  const { data, isFetching, isError, isLoading } = useFetchPokemonsQuery({ offset, limit });

  const pokemons = data ? data.results : [];
  const hasNextPage = data ? !!data.next : false;
  const hasPreviousPage = data ? !!data.previous : false;

  const fetchNextPage = () => {
    if (hasNextPage) {
      setOffset(_offset => _offset + limit);
    }
  };

  const fetchPreviousPage = () => {
    if (hasPreviousPage) {
      setOffset(_offset => _offset - limit);
    }
  };

  return {
    pokemons,
    isError,
    isLoading,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
};
