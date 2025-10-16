
export enum Algorithm {
  BubbleSort = 'Bubble Sort',
  SelectionSort = 'Selection Sort',
  InsertionSort = 'Insertion Sort',
  MergeSort = 'Merge Sort',
  QuickSort = 'Quick Sort',
}

export enum BarState {
  Default,
  Comparing,
  Swapping,
  Sorted,
  Pivot,
}

export interface AnimationStep {
  arrayState: number[];
  barStates: BarState[];
  metrics: {
    comparisons: number;
    swaps: number;
  };
  description: string;
}
