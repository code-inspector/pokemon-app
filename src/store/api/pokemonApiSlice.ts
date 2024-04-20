import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../config/constants';
import { Pokemon, PokemonListResponse, PokemonResult } from '../../config/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: builder => ({
    fetchPokemons: builder.query<PokemonResult[], void>({
      query: () => `/pokemon/`,
      transformResponse: (response: PokemonListResponse): PokemonResult[] =>
        response.results.map(pokemon => ({
          name: pokemon.name,
          url: pokemon.url,
        })),
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
