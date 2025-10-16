
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import MetricsPanel from './components/MetricsPanel';
import { generateAnimationSteps } from './services/sortingAlgorithms';
import { AnimationStep, Algorithm } from './types';
import { DEFAULT_ARRAY, MAX_ARRAY_SIZE } from './constants';

const App: React.FC = () => {
  const [arrayInput, setArrayInput] = useState<string>(DEFAULT_ARRAY.join(', '));
  const [currentArray, setCurrentArray] = useState<number[]>(DEFAULT_ARRAY);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(Algorithm.BubbleSort);
  const [animationSteps, setAnimationSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [error, setError] = useState<string>('');

  const timerRef = useRef<number | null>(null);

  const resetAnimation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsPlaying(false);
    
    const parsedArray = arrayInput.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    if (parsedArray.length === 0 && arrayInput.trim() !== '') {
        setError('Invalid array format. Please use comma-separated numbers.');
        setCurrentArray([]);
        setAnimationSteps([]);
        setCurrentStepIndex(0);
        return;
    }
    if (parsedArray.length > MAX_ARRAY_SIZE) {
        setError(`Array size is too large. Please use up to ${MAX_ARRAY_SIZE} elements for optimal performance.`);
        setCurrentArray(parsedArray);
        setAnimationSteps([]);
        setCurrentStepIndex(0);
        return;
    }

    setError('');
    setCurrentArray(parsedArray);
    const steps = generateAnimationSteps(parsedArray, selectedAlgorithm);
    setAnimationSteps(steps);
    setCurrentStepIndex(0);
  }, [arrayInput, selectedAlgorithm]);

  useEffect(() => {
    resetAnimation();
  }, [resetAnimation]);

  useEffect(() => {
    if (isPlaying && currentStepIndex < animationSteps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, 1000 / (speed / 10));
    } else if (currentStepIndex === animationSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, animationSteps.length, speed]);
  
  const handlePlayPause = () => {
    if (currentStepIndex >= animationSteps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < animationSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepBack = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    resetAnimation();
  };

  const currentStep = animationSteps[currentStepIndex] || { arrayState: currentArray, barStates: [], metrics: { comparisons: 0, swaps: 0 }, description: 'Ready to start' };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        <Header
          arrayInput={arrayInput}
          setArrayInput={setArrayInput}
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
          onVisualize={handleReset}
          isAnimating={isPlaying}
        />

        {error && <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-md text-center">{error}</div>}

        <main className="flex flex-col lg:flex-row gap-6">
          <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-2xl flex flex-col gap-4">
            <Visualizer 
              array={currentStep.arrayState} 
              barStates={currentStep.barStates} 
            />
            <p className="text-center text-gray-400 h-6">{currentStep.description}</p>
          </div>

          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            <Controls
              isPlaying={isPlaying}
              onPlayPause={handlePlayPause}
              onStepBack={handleStepBack}
              onStepForward={handleStepForward}
              onReset={handleReset}
              speed={speed}
              setSpeed={setSpeed}
              isFinished={currentStepIndex >= animationSteps.length - 1 && animationSteps.length > 0}
            />
            <MetricsPanel metrics={currentStep.metrics} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
