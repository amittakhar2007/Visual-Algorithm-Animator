
import React from 'react';
import { BarState } from '../types';
import { BAR_STATE_COLORS } from '../constants';

interface VisualizerProps {
  array: number[];
  barStates: BarState[];
}

const Visualizer: React.FC<VisualizerProps> = ({ array, barStates }) => {
  const maxValue = Math.max(...array, 1);

  return (
    <div className="w-full h-64 md:h-96 flex justify-center items-end gap-0.5 transition-all duration-300 ease-in-out p-2 bg-gray-900/50 rounded-md">
      {array.map((value, idx) => {
        const heightPercentage = (value / maxValue) * 100;
        const colorClass = BAR_STATE_COLORS[barStates[idx] || BarState.Default];

        return (
          <div
            key={idx}
            className={`flex-grow transition-all duration-200 ease-linear ${colorClass}`}
            style={{ height: `${heightPercentage}%` }}
            title={`${value}`}
          >
            {array.length < 30 && (
                <span className="text-xs text-black font-bold flex items-center justify-center h-full">
                    {value}
                </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Visualizer;
