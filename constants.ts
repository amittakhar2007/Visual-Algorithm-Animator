
import { BarState } from './types';

export const DEFAULT_ARRAY = [44, 23, 7, 56, 12, 89, 3, 50, 19, 65, 31, 95];
export const MAX_ARRAY_SIZE = 100;

export const BAR_STATE_COLORS: { [key in BarState]: string } = {
  [BarState.Default]: 'bg-sky-500',
  [BarState.Comparing]: 'bg-yellow-500',
  [BarState.Swapping]: 'bg-red-500',
  [BarState.Sorted]: 'bg-emerald-500',
  [BarState.Pivot]: 'bg-purple-500',
};
