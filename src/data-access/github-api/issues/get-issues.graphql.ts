import { graphql } from '../../../gql';

export const getIssuesQuery = graphql(`
  query GetIssues {
    repository(owner: "facebook", name: "react") {
      issues(states: OPEN, first: 25) {
        totalCount
        edges {
          node {
            ...IssueItem
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
