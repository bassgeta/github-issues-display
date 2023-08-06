import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, describe, vi } from 'vitest';
import { IssueItemFragment, IssueState } from '@gql/graphql';
import { RemoveIssueModal } from './remove-issue-modal';

const handleCloseMock = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    removeIssueMock: vi.fn(),
  };
});

vi.mock('./remove-issue', () => ({
  removeIssue: mocks.removeIssueMock,
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

describe('RemoveIssueModal', () => {
  const user = userEvent.setup();
  function renderRemoveIssueModal() {
    render(
      <RemoveIssueModal handleClose={handleCloseMock} issue={mockIssue} />,
    );
  }

  test('should correctly remove issue', async () => {
    renderRemoveIssueModal();

    // Get the confirm button and click it
    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    // Assert that the handleClose function is called
    expect(mocks.removeIssueMock).toHaveBeenCalledWith(mockIssue.id);
    expect(handleCloseMock).toHaveBeenCalled();
  });

  test('should call handleClose when clicking the cancel button', async () => {
    renderRemoveIssueModal();

    // Get the cancel button and click it
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    // Assert that the handleClose function is called
    expect(handleCloseMock).toHaveBeenCalled();
  });
});
