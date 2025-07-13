import React from 'react';
import type { IErrorMessageProps } from '../types/data';

const ErrorMessage: React.FC<IErrorMessageProps> = ({ message }) => (
  <div className="w-full p-6 bg-red-100 border border-red-300 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-red-700 mb-3">
      Oops! Something went wrong.
    </h2>
    <p className="text-red-600 mb-4">{message}</p>
  </div>
);

export default ErrorMessage;
