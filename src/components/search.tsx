import React, { type ChangeEvent } from 'react';
import type { ISearchProps, ISearchState } from '../types/data';

class Search extends React.Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      inputValue: props.initialValue || '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ inputValue: value });

    if (value.trim() === '') {
      this.props.onSearch('');
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  handleClick = () => {
    this.props.onSearch(this.state.inputValue.trim());
  };

  render() {
    return (
      <div className="w-full flex items-center">
        <input
          type="text"
          aria-label="Search input"
          placeholder="Search"
          value={this.state.inputValue}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          className="w-full py-2 px-6 border h-11 border-gray-400 rounded-s-xl focus:outline-none"
        />
        <button
          onClick={this.handleClick}
          className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer px-6 py-2 rounded-e-xl text-lg text-white"
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
