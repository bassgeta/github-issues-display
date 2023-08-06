import { IssueItemFragment } from '@gql/graphql';
import { FC } from 'react';
import './issue-row.css';

interface IssueRowProps {
  issue: IssueItemFragment;
}

export const IssueRow: FC<IssueRowProps> = ({ issue }) => {
  // const a = 1;

  return (
    <tr className="issue-row">
      <td>{issue.createdAt}</td>
      <td>{issue.title}</td>
      <td>
        <div className="author">
          {issue.author?.avatarUrl ? (
            <img className="user-avatar" src={issue.author.avatarUrl} />
          ) : null}
          {issue.author?.login ?? null}
        </div>
      </td>
      <td>{issue.state}</td>
      <td>
        <a href={issue.url} target="_blank" rel="noopener noreferrer">
          Click me
        </a>
      </td>
    </tr>
  );
};
