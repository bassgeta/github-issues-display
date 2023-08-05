import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { FragmentType, getFragmentData } from '../../../gql';
import { IssueFragment, getIssuesQuery } from './get-issues.graphql';
import {
  GetIssuesQuery,
  IssueItemFragment,
  IssueOrderField,
  OrderDirection,
} from '@gql/graphql';

export type IssueItem = FragmentType<typeof IssueFragment>;

export interface UseGetIssuesParams {
  sortField?: IssueOrderField;
  sortDirection?: OrderDirection;
}

interface UseGetIssuesResult {
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
  data: IssueItemFragment[];
}

export function useGetIssues({
  sortDirection,
  sortField,
}: UseGetIssuesParams): UseGetIssuesResult {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchQuery,
  } = useQuery<GetIssuesQuery, unknown, IssueItemFragment[]>({
    queryKey: ['get-issues', { sortDirection, sortField }],
    queryFn: async () => {
      return request(
        'https://api.github.com/graphql',
        getIssuesQuery,
        {
          orderByValues:
            sortDirection && sortField
              ? {
                  direction: sortDirection,
                  field: sortField,
                }
              : null,
        },
        {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
          'User-Agent': 'Flawless challenge',
        },
      );
    },
    select: (data): IssueItemFragment[] => {
      if (!data.repository || !data.repository.issues.edges) {
        return [];
      }

      const remappedIssues = data.repository.issues.edges.reduce(
        (issues: IssueItemFragment[], edge) => {
          if (edge?.node) {
            const issue = getFragmentData(IssueFragment, edge.node);

            return [...issues, issue];
          }

          return issues;
        },
        [],
      );

      return remappedIssues;
    },
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 2,
  });

  const refetch = async (): Promise<void> => {
    await refetchQuery();
  };

  return {
    isLoading,
    isError,
    refetch,
    data: data ?? [],
  };
}
