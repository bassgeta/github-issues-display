import { IssueItemFragment } from '@gql/graphql';
import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@design-system/button/button';
import { EditIssueModal } from '../../../edit-issue-modal/edit-issue-modal';
import { RemoveIssueModal } from '../../../remove-issue-modal/remove-issue-modal';
import './issue-row.css';

interface IssueRowProps {
  issue: IssueItemFragment;
}

export const IssueRow: FC<IssueRowProps> = ({ issue }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  return (
    <>
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
        <td>
          <div className="actions">
            <Button
              className="action-btn"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              ✏️
            </Button>
            <Button
              variant="destructive"
              className="action-btn"
              onClick={() => {
                setIsRemoving(true);
              }}
            >
              🗑️
            </Button>
          </div>
        </td>
      </tr>
      {/* So we don't have a modal inside a table :) */}
      {isEditing &&
        createPortal(
          <EditIssueModal
            handleClose={() => {
              setIsEditing(false);
            }}
            issue={issue}
          />,
          document.body,
        )}
      {isRemoving &&
        createPortal(
          <RemoveIssueModal
            handleClose={() => {
              setIsRemoving(false);
            }}
            issue={issue}
          />,
          document.body,
        )}
    </>
  );
};
