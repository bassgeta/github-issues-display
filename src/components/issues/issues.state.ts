import { IssueOrderField, OrderDirection } from '@gql/graphql';
import { create } from 'zustand';

interface SortingParams {
  sortField: IssueOrderField;
  sortDirection: OrderDirection;
}

interface IssuesState {
  sortingParams: SortingParams | null;
  setSortingParams: (newParams: SortingParams | null) => void;
}

export const useIssuesState = create<IssuesState>()((set) => ({
  sortingParams: null,
  setSortingParams: (newParams: SortingParams | null) =>
    set(() => ({
      sortingParams: newParams,
    })),
}));
