
import React from 'react';
import { Algorithm } from '../types';

interface HeaderProps {
  arrayInput: string;
  setArrayInput: (value: string) => void;
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  onVisualize: () => void;
  isAnimating: boolean;
}

const Header: React.FC<HeaderProps> = ({
  arrayInput,
  setArrayInput,
  selectedAlgorithm,
  setSelectedAlgorithm,
  onVisualize,
  isAnimating,
}) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-4">
      <h1 className="text-2xl font-bold text-sky-400 whitespace-nowrap">Visual Algorithm Animator</h1>
      <div className="flex-grow flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <div className="w-full flex-grow">
           <label htmlFor="array-input" className="sr-only">Data Set</label>
           <input
            id="array-input"
            type="text"
            value={arrayInput}
            onChange={(e) => setArrayInput(e.target.value)}
            placeholder="e.g., 4, 3, 2, 1"
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isAnimating}
          />
        </div>
        <div className="w-full sm:w-auto">
          <label htmlFor="algorithm-select" className="sr-only">Algorithm</label>
          <select
            id="algorithm-select"
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value as Algorithm)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            disabled={isAnimating}
          >
            {Object.values(Algorithm).map((alg) => (
              <option key={alg} value={alg}>{alg}</option>
            ))}
          </select>
        </div>
        <button
          onClick={onVisualize}
          className="w-full sm:w-auto bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={isAnimating}
        >
          Visualize
        </button>
      </div>
    </header>
  );
};

export default Header;
