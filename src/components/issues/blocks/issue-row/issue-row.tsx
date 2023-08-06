import { IssueItemFragment } from '@gql/graphql';
import { FC } from 'react';

interface IssueRowProps {
  issue: IssueItemFragment;
}

export const IssueRow: FC<IssueRowProps> = ({ issue }) => {
  // const a = 1;

  return (
    <tr>
      <td>{issue.title}</td>
      <td>{issue.author?.login ?? null}</td>
      <td>{issue.state}</td>
      <td>{issue.createdAt}</td>
    </tr>
  );
};
