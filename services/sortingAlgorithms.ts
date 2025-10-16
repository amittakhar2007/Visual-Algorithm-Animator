
import { Algorithm, AnimationStep, BarState } from '../types';

export function generateAnimationSteps(array: number[], algorithm: Algorithm): AnimationStep[] {
  switch (algorithm) {
    case Algorithm.BubbleSort:
      return bubbleSort(array);
    case Algorithm.SelectionSort:
      return selectionSort(array);
    case Algorithm.InsertionSort:
      return insertionSort(array);
    case Algorithm.MergeSort:
      return mergeSort(array);
    case Algorithm.QuickSort:
        return quickSort(array);
    default:
      return [];
  }
}

// --- UTILITY for creating steps ---
const createStep = (
    arrayState: number[], 
    barStates: BarState[], 
    comparisons: number, 
    swaps: number,
    description: string
): AnimationStep => ({
    arrayState: [...arrayState],
    barStates: [...barStates],
    metrics: { comparisons, swaps },
    description
});

// --- BUBBLE SORT ---
function bubbleSort(array: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const barStates = Array(n).fill(BarState.Default);

  steps.push(createStep(arr, barStates, comparisons, swaps, 'Initial array'));

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      barStates[j] = BarState.Comparing;
      barStates[j + 1] = BarState.Comparing;
      steps.push(createStep(arr, barStates, ++comparisons, swaps, `Comparing ${arr[j]} and ${arr[j+1]}`));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        barStates[j] = BarState.Swapping;
        barStates[j + 1] = BarState.Swapping;
        steps.push(createStep(arr, barStates, comparisons, swaps, `Swapping ${arr[j+1]} and ${arr[j]}`));
      }
      barStates[j] = BarState.Default;
      barStates[j + 1] = BarState.Default;
    }
    barStates[n - 1 - i] = BarState.Sorted;
  }
  if (n > 0) barStates[0] = BarState.Sorted;
  steps.push(createStep(arr, barStates, comparisons, swaps, 'Array is sorted!'));
  return steps;
}

// --- SELECTION SORT ---
function selectionSort(array: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;
  const barStates = Array(n).fill(BarState.Default);

  steps.push(createStep(arr, barStates, comparisons, swaps, 'Initial array'));

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    barStates[i] = BarState.Pivot; // Current position to fill

    for (let j = i + 1; j < n; j++) {
      barStates[j] = BarState.Comparing;
      steps.push(createStep(arr, barStates, ++comparisons, swaps, `Comparing minimum (${arr[minIdx]}) with ${arr[j]}`));
      
      if (arr[j] < arr[minIdx]) {
        barStates[minIdx] = BarState.Default; // old min is no longer pivot
        minIdx = j;
        barStates[minIdx] = BarState.Pivot; // new min found
        steps.push(createStep(arr, barStates, comparisons, swaps, `Found new minimum: ${arr[minIdx]}`));
      } else {
        barStates[j] = BarState.Default;
      }
    }
    
    if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        barStates[i] = BarState.Swapping;
        barStates[minIdx] = BarState.Swapping;
        steps.push(createStep(arr, barStates, comparisons, swaps, `Swapping ${arr[minIdx]} with ${arr[i]}`));
    }
    
    // Reset states for next pass
    barStates.fill(BarState.Default, i+1);
    barStates[minIdx] = BarState.Default;
    barStates[i] = BarState.Sorted;
  }
  if(n > 0) barStates[n - 1] = BarState.Sorted;
  steps.push(createStep(arr, barStates, comparisons, swaps, 'Array is sorted!'));
  return steps;
}

// --- INSERTION SORT ---
function insertionSort(array: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    const barStates = Array(n).fill(BarState.Default);

    steps.push(createStep(arr, barStates, comparisons, swaps, 'Initial array'));
    if(n>0) barStates[0] = BarState.Sorted;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        barStates[i] = BarState.Pivot; // Key element
        steps.push(createStep(arr, barStates, comparisons, swaps, `Selecting ${key} to insert into sorted part`));

        while (j >= 0 && arr[j] > key) {
            barStates[j] = BarState.Comparing;
            steps.push(createStep(arr, barStates, ++comparisons, swaps, `${arr[j]} > ${key}, shifting ${arr[j]} right`));
            
            arr[j + 1] = arr[j];
            swaps++; // Technically a shift, but represents data movement
            
            barStates[j+1] = BarState.Swapping;
            steps.push(createStep(arr, barStates, comparisons, swaps, `Shifting ${arr[j]}`));

            barStates[j+1] = BarState.Sorted;
            barStates[j] = BarState.Default;
            j = j - 1;
        }
        arr[j + 1] = key;
        
        // Reset states and show insertion
        barStates[i] = BarState.Default;
        barStates[j+1] = BarState.Swapping;
        steps.push(createStep(arr, barStates, comparisons, swaps, `Inserting ${key} at its correct position`));

        // Mark the sorted part
        for(let k=0; k<=i; k++) barStates[k] = BarState.Sorted;
    }

    barStates.fill(BarState.Sorted);
    steps.push(createStep(arr, barStates, comparisons, swaps, 'Array is sorted!'));
    return steps;
}

// --- MERGE SORT ---
function mergeSort(array: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    let comparisons = 0;
    let swaps = 0;

    function merge(arr: number[], l: number, m: number, r: number) {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            const barStates = Array(arr.length).fill(BarState.Default);
            for(let p=l; p<=r; p++) barStates[p] = BarState.Comparing;
            steps.push(createStep(arr, barStates, ++comparisons, swaps, `Comparing ${L[i]} and ${R[j]}`));

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            barStates[k] = BarState.Swapping;
            steps.push(createStep(arr, barStates, comparisons, ++swaps, `Placing ${arr[k]} into correct position`));
            barStates[k] = BarState.Default;
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            const barStates = Array(arr.length).fill(BarState.Default);
            barStates[k] = BarState.Swapping;
            steps.push(createStep(arr, barStates, comparisons, ++swaps, `Placing remaining ${arr[k]}`));
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = R[j];
            const barStates = Array(arr.length).fill(BarState.Default);
            barStates[k] = BarState.Swapping;
            steps.push(createStep(arr, barStates, comparisons, ++swaps, `Placing remaining ${arr[k]}`));
            j++;
            k++;
        }
    }

    function sort(arr: number[], l: number, r: number) {
        if (l >= r) return;
        const m = l + Math.floor((r - l) / 2);
        sort(arr, l, m);
        sort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
    
    const arr = [...array];
    steps.push(createStep(arr, Array(arr.length).fill(BarState.Default), 0, 0, 'Initial array'));
    sort(arr, 0, arr.length - 1);
    steps.push(createStep(arr, Array(arr.length).fill(BarState.Sorted), comparisons, swaps, 'Array is sorted!'));
    
    return steps;
}


// --- QUICK SORT (Lomuto partition scheme) ---
function quickSort(array: number[]): AnimationStep[] {
    const steps: AnimationStep[] = [];
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;

    function partition(low: number, high: number) {
        const pivot = arr[high];
        let i = low - 1;
        
        const barStates = Array(arr.length).fill(BarState.Default);
        for(let k=low; k < high; k++) barStates[k] = BarState.Default;
        barStates[high] = BarState.Pivot;
        steps.push(createStep(arr, barStates, comparisons, swaps, `Partitioning from index ${low} to ${high}. Pivot is ${pivot}`));

        for (let j = low; j < high; j++) {
            barStates[j] = BarState.Comparing;
            steps.push(createStep(arr, barStates, ++comparisons, swaps, `Comparing ${arr[j]} with pivot ${pivot}`));
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swaps++;
                barStates[i] = BarState.Swapping;
                barStates[j] = BarState.Swapping;
                steps.push(createStep(arr, barStates, comparisons, swaps, `Swapping ${arr[j]} and ${arr[i]}`));
                barStates[i] = BarState.Default;
            }
            barStates[j] = BarState.Default;
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        barStates[i+1] = BarState.Swapping;
        barStates[high] = BarState.Swapping;
        steps.push(createStep(arr, barStates, comparisons, swaps, `Placing pivot ${pivot} in its final sorted position`));
        
        return i + 1;
    }

    function sort(low: number, high: number, barStates: BarState[]) {
        if (low < high) {
            const pi = partition(low, high);
            
            const nextBarStates = [...barStates];
            nextBarStates[pi] = BarState.Sorted;
            for(let k=0; k<nextBarStates.length; k++) {
                if(nextBarStates[k] !== BarState.Sorted) nextBarStates[k] = BarState.Default;
            }
            steps.push(createStep(arr, nextBarStates, comparisons, swaps, `Pivot ${arr[pi]} is sorted. Recursively sorting partitions.`));

            sort(low, pi - 1, nextBarStates);
            sort(pi + 1, high, nextBarStates);
        } else if (low === high) {
             const nextBarStates = [...barStates];
             nextBarStates[low] = BarState.Sorted;
             steps.push(createStep(arr, nextBarStates, comparisons, swaps, `Single element partition at index ${low} is sorted`));
        }
    }
    
    steps.push(createStep(arr, Array(arr.length).fill(BarState.Default), 0, 0, 'Initial array'));
    sort(0, arr.length - 1, Array(arr.length).fill(BarState.Default));
    steps.push(createStep(arr, Array(arr.length).fill(BarState.Sorted), comparisons, swaps, 'Array is sorted!'));
    
    return steps;
}
