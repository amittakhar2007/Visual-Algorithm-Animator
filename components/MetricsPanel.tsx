
import React from 'react';
import { AnimationStep } from '../types';

interface MetricsPanelProps {
  metrics: AnimationStep['metrics'];
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl">
      <h2 className="text-lg font-bold text-sky-400 mb-4 text-center">Performance Metrics</h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
          <span className="font-medium text-gray-300">Comparisons</span>
          <span className="text-xl font-mono bg-gray-900 px-3 py-1 rounded text-yellow-400">{metrics.comparisons}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-700/50 p-3 rounded-md">
          <span className="font-medium text-gray-300">Swaps</span>
          <span className="text-xl font-mono bg-gray-900 px-3 py-1 rounded text-red-400">{metrics.swaps}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;
