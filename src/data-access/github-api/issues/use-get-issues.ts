import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { getFragmentData } from '../../../gql';
import { IssueFragment, getIssuesQuery } from './get-issues.graphql';
import { GetIssuesQuery, IssueItemFragment } from '@gql/graphql';
import { IssuesQueryData, UseGetIssuesParams } from './interfaces';
import { getQueryVariables } from './helpers';

// This could also be reworked into useInfiniteQuery and holding local state about the page number
export function useGetIssues(params: UseGetIssuesParams) {
  const { sortDirection, sortField, paginationCursor, paginationDirection } =
    params;
  return useQuery<GetIssuesQuery, unknown, IssuesQueryData | null>({
    queryKey: [
      'get-issues',
      { sortDirection, sortField },
      { paginationCursor, paginationDirection },
    ],
    queryFn: async () => {
      return request(
        'https://api.github.com/graphql',
        getIssuesQuery,
        {
          ...getQueryVariables(params),
        },
        {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
          'User-Agent': 'Flawless challenge',
        },
      );
    },
    select: (data): IssuesQueryData | null => {
      if (!data.repository || !data.repository.issues.edges) {
        return null;
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

      return {
        issues: remappedIssues,
        paginationInfo: data.repository.issues.pageInfo,
      };
    },
    keepPreviousData: true,
  });
}
