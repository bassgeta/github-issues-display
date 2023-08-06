import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, describe, vi } from 'vitest';
import { IssueItemFragment, IssueState } from '@gql/graphql';
import { EditIssueModal } from './edit-issue-modal';

const handleCloseMock = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    editIssueMock: vi.fn(),
  };
});

vi.mock('./edit-issue', () => ({
  editIssue: mocks.editIssueMock,
}));

const mockIssue: IssueItemFragment = {
  author: {
    avatarUrl: 'some-url',
    login: 'Mock author',
  },
  createdAt: '2013-08-21T21:41:26Z',
  id: 'mock-issue-id',
  state: IssueState.Open,
  title: 'Mock issue!',
  url: 'some url',
};

describe('EditIssueModal', () => {
  const user = userEvent.setup();
  function renderEditIssueModal() {
    render(<EditIssueModal handleClose={handleCloseMock} issue={mockIssue} />);
  }

  test('should correctly edit issue', async () => {
    renderEditIssueModal();

    // Get the input field and type into it
    const inputField = screen.getByLabelText('Title');
    await user.clear(inputField);
    await user.type(inputField, 'New title');

    // Get the confirm button and click it
    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    // Assert that the handleClose function is called
    expect(mocks.editIssueMock).toHaveBeenCalledWith({
      ...mockIssue,
      title: 'New title',
    });
    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('should call handleClose when clicking the cancel button', async () => {
    renderEditIssueModal();

    // Get the cancel button and click it
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    // Assert that the handleClose function is called
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
