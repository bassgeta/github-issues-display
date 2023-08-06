import { IssueItemFragment } from '@gql/graphql';

// This is a mock function instead of an actual API call
export function editIssue(updatedIssue: IssueItemFragment) {
  console.log('Updating issue', updatedIssue);
}
