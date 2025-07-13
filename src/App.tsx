import { useState, useEffect } from 'react';
import Card from './components/card.tsx';
import Search from './components/search.tsx';
import Loader from './components/loader.tsx';
import ErrorMessage from './components/error-message.tsx';
import ErrorBoundary from './components/error.tsx';
import { fetchPokemon } from './api/fetchPokemon.ts';
import type { IPokemon } from './types/data.ts';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IPokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) {
      setSearchTerm(savedSearch);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await fetchPokemon(searchTerm, page);
        setData(results);
      } catch (e: any) {
        setError(e.message || 'Failed to fetch Pokémon data');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchTerm, page]);

  const handleSearch = (term: string) => {
    const trimmedTerm = term.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    setSearchTerm(trimmedTerm);
    setPage(0);
  };

  return (
    <ErrorBoundary>
      <div className="max-w-3xl w-full flex flex-col gap-10 justify-center items-center mx-auto my-5">
        <Search initialValue={searchTerm} onSearch={handleSearch} />

        <button
          onClick={() => {
            throw new Error('User-triggered test error');
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
        >
          Throw Error
        </button>

        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}

        {!isLoading && !error && (
          <>
            {data.length === 0 ? (
              <p>No Pokémon found.</p>
            ) : (
              data.map((pokemon) => (
                <Card
                  key={pokemon.name}
                  name={pokemon.name}
                  url={pokemon.url}
                />
              ))
            )}

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <span className="font-medium text-gray-700">
                Page: {page + 1}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
