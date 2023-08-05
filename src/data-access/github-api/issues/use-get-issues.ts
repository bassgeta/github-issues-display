import request from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import { graphql } from '../../../gql';

const getIssuesQuery = graphql(`
  query GetIssues {
    repository(owner: "facebook", name: "react") {
      issues(states: OPEN, first: 100) {
        totalCount
        edges {
          node {
            title
            url
            createdAt
            updatedAt
            author {
              login
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`);

export function useGetIssues() {
  const { data, isLoading } = useQuery({
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

  return { data, isLoading };
}
