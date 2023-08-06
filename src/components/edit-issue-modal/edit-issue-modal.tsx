import { Input } from '@design-system/input/input';
import { Modal } from '@design-system/modal/modal';
import { IssueItemFragment } from '@gql/graphql';
import { FC, useState } from 'react';
import './edit-issue-modal.css';
import { Button } from '@design-system/button/button';
import { editIssue } from './edit-issue';

interface EditIssueModalProps {
  handleClose: VoidFunction;
  issue: IssueItemFragment;
}

export const EditIssueModal: FC<EditIssueModalProps> = ({
  handleClose,
  issue,
}) => {
  const [issueTitle, setIssueTitle] = useState(issue.title);

  function handleConfirmEdit() {
    editIssue({
      ...issue,
      title: issueTitle,
    });
    handleClose();
  }

  return (
    <Modal handleClose={handleClose}>
      <div className="edit-issue-modal">
        <h2 className="title">Edit issue</h2>
        <div className="input-section">
          <label className="label" htmlFor="issue-title">
            Title
          </label>
          <Input
            type="text"
            id="issue-title"
            value={issueTitle}
            onChange={(e) => {
              setIssueTitle(e.target.value);
            }}
          />
        </div>
        <div className="button-section">
          <Button variant="primary" onClick={handleConfirmEdit}>
            Confirm
          </Button>
          <Button variant="destructive" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
