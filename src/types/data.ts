import type { ReactNode } from 'react';

export interface ICardProps {
  name: string;
  url: string;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export interface IErrorMessageProps {
  message: string;
}

export interface ISearchProps {
  initialValue: string;
  onSearch: (term: string) => void;
}

export interface ISearchState {
  inputValue: string;
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IAppState {
  isLoading: boolean;
  error: string | null;
  data: IPokemon[];
  searchTerm: string;
  page: number;
}

export interface IFetchPokemonParams {
  term?: string;
  page?: number;
  limit?: number;
}
