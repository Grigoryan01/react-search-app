import React from 'react';
import type { ICardProps } from '../types/data';

const Card: React.FC<ICardProps> = ({ name, url }) => (
  <div className="w-full bg-white shadow rounded p-4 mb-3 border-l-4 border-blue-500">
    <h3 className="text-lg text-gray-600">
      <span className="font-semibold">Name:</span> {name}
    </h3>
    <p className="text-lg font-semibold text-gray-600">
      URL:{' '}
      <a
        href={url}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    </p>
  </div>
);

export default Card;
