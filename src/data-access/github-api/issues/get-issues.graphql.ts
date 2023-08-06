import { graphql } from '../../../gql';

export const getIssuesQuery = graphql(`
  query GetIssues($orderByValues: IssueOrder) {
    repository(owner: "facebook", name: "react") {
      issues(states: OPEN, first: 25, orderBy: $orderByValues) {
        totalCount
        edges {
          node {
            ...IssueItem
          }
        }
        pageInfo {
          hasPreviousPage
          startCursor
          hasNextPage
          endCursor
        }
      }
    }
  }
`);

export const IssueFragment = graphql(`
  fragment IssueItem on Issue {
    id
    title
    url
    createdAt
    author {
      avatarUrl
      login
    }
    state
  }
`);
