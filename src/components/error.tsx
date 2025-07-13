import React, { Component } from 'react';
import type { IErrorBoundaryProps, IErrorBoundaryState } from '../types/data';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): IErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-6 bg-red-100 border border-red-300 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-700 mb-3">
            Oops! Something went wrong.
          </h2>
          <p className="text-red-600 mb-4">{this.state.errorMessage}</p>

          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 hover:cursor-pointer px-6 py-2 rounded-xl text-lg text-white"
            onClick={() => {
              throw new Error('User-triggered test error');
            }}
          >
            Throw Error
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
