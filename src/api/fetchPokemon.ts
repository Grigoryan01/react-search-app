import type { IPokemon } from '../types/data';

const limit = 20;

export const fetchPokemon = async (
  term: string,
  pageNumber: number
): Promise<IPokemon[]> => {
  const offset = pageNumber * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json: { results: IPokemon[] } = await response.json();
  let filteredResults = json.results;

  if (term) {
    filteredResults = filteredResults.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  return filteredResults;
};
