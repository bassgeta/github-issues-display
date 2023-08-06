import {
  IssueItemFragment,
  IssueOrderField,
  OrderDirection,
  PageInfo,
} from '@gql/graphql';

export interface UseGetIssuesParams {
  sortField?: IssueOrderField;
  sortDirection?: OrderDirection;
  paginationCursor?: string;
  paginationDirection?: 'after' | 'before';
}

export interface IssuesQueryData {
  issues: IssueItemFragment[];
  paginationInfo: PageInfo;
}

export interface UseGetIssuesResult {
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
  data: IssuesQueryData | null;
}
