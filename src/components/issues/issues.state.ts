import { IssueOrderField, OrderDirection } from '@gql/graphql';
import { create } from 'zustand';

interface SortingParams {
  sortField: IssueOrderField;
  sortDirection: OrderDirection;
}

interface PaginationParams {
  paginationDirection: 'after' | 'before';
  paginationCursor: string;
}

interface IssuesState {
  sortingParams: SortingParams | null;
  setSortingParams: (newParams: SortingParams | null) => void;
  paginationParams: PaginationParams | null;
  setPaginationParams: (newParams: PaginationParams | null) => void;
}

export const useIssuesState = create<IssuesState>()((set) => ({
  sortingParams: null,
  paginationParams: null,
  setSortingParams: (newParams: SortingParams | null) =>
    set(() => ({
      sortingParams: newParams,
      paginationParams: null,
    })),
  setPaginationParams: (newParams: PaginationParams | null) =>
    set(() => ({
      paginationParams: newParams,
    })),
}));
