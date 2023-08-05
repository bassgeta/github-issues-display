import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { FragmentType, getFragmentData } from '../../../gql';
import { IssueFragment, getIssuesQuery } from './get-issues.graphql';
import { GetIssuesQuery, IssueItemFragment } from '@gql/graphql';

export type IssueItem = FragmentType<typeof IssueFragment>;

interface UseGetIssuesResult {
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
  data: IssueItemFragment[];
}

export function useGetIssues(): UseGetIssuesResult {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchQuery,
  } = useQuery<GetIssuesQuery, unknown, IssueItemFragment[]>({
    queryKey: ['get-issues'],
    queryFn: async () => {
      return request(
        'https://api.github.com/graphql',
        getIssuesQuery,
        undefined,
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
