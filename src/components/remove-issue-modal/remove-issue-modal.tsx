import { Modal } from '@design-system/modal/modal';
import { IssueItemFragment } from '@gql/graphql';
import { FC } from 'react';
import './remove-issue-modal.css';
import { Button } from '@design-system/button/button';
import { removeIssue } from './remove-issue';

interface RemoveIssueModalProps {
  handleClose: VoidFunction;
  issue: IssueItemFragment;
}

export const RemoveIssueModal: FC<RemoveIssueModalProps> = ({
  handleClose,
  issue,
}) => {
  function handleConfirmRemove() {
    removeIssue(issue.id);
    handleClose();
  }

  return (
    <Modal handleClose={handleClose}>
      <div className="remove-issue-modal">
        <h2 className="title">Remove issue "{issue.title}"?</h2>
        <div className="button-section">
          <Button variant="primary" onClick={handleConfirmRemove}>
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
