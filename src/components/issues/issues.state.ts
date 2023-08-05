import { SortingState } from '@tanstack/react-table';
import { create } from 'zustand';

interface IssuesState {
  sortingState: SortingState;
  setSortingState: (newState: SortingState) => void;
}

export const useIssuesState = create<IssuesState>()((set) => ({
  sortingState: [],
  setSortingState: (newState: SortingState) =>
    set(() => ({
      sortingState: newState,
    })),
}));
