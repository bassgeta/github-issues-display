import { graphql } from '../../../gql';

export const getIssuesQuery = graphql(`
  query GetIssues(
    $orderByValues: IssueOrder
    $afterCursor: String
    $beforeCursor: String
    $firstValue: Int
    $lastValue: Int
  ) {
    repository(owner: "facebook", name: "react") {
      issues(
        states: OPEN
        first: $firstValue
        last: $lastValue
        orderBy: $orderByValues
        after: $afterCursor
        before: $beforeCursor
      ) {
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
