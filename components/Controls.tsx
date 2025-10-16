
import React from 'react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isFinished: boolean;
}

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const PauseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

const ReplayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
    </svg>
);


const Controls: React.FC<ControlsProps> = ({
  isPlaying, onPlayPause, onStepBack, onStepForward, onReset, speed, setSpeed, isFinished
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl space-y-4">
      <div className="flex justify-around items-center">
        <button onClick={onStepBack} className="p-2 rounded-full bg-gray-700 hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Step Back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
        </button>
        <button onClick={onPlayPause} className="p-3 rounded-full bg-sky-600 hover:bg-sky-500 transition-colors text-white w-14 h-14 flex items-center justify-center" title={isPlaying ? "Pause" : isFinished ? "Replay" : "Play"}>
            {isPlaying ? <PauseIcon className="w-8 h-8"/> : isFinished ? <ReplayIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
        </button>
        <button onClick={onStepForward} className="p-2 rounded-full bg-gray-700 hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" title="Step Forward">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>
      </div>
      <div className="space-y-2">
        <label htmlFor="speed-slider" className="block text-sm font-medium text-gray-400 text-center">Speed</label>
        <input
          id="speed-slider"
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
       <button onClick={onReset} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200">
          Reset / New Data
        </button>
    </div>
  );
};

export default Controls;
