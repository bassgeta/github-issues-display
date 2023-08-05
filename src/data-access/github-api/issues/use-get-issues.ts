import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { FragmentType } from '../../../gql';
import { IssueFragment, getIssuesQuery } from './get-issues.graphql';

export type IssueItem = FragmentType<typeof IssueFragment>;

interface UseGetIssuesResult {
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
  data: IssueItem[];
}

export function useGetIssues(): UseGetIssuesResult {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchQuery,
  } = useQuery({
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
  });

  const refetch = async (): Promise<void> => {
    await refetchQuery();
  };

  return {
    isLoading,
    isError,
    refetch,
    data: data?.repository?.issues.edges ?? [],
  };
}
