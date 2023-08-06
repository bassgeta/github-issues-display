import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { test, describe } from 'vitest';
import { IssueItemFragment, IssueState } from '@gql/graphql';
import { IssueRow } from './issue-row';

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

describe('IssueRow', () => {
  const user = userEvent.setup();

  function renderIssueRow() {
    render(<IssueRow issue={mockIssue} />);
  }
  test('should open the edit modal when clicking the edit button and close it', async () => {
    renderIssueRow();

    const editButton = screen.getByText('✏️');

    await user.click(editButton);

    const editModal = screen.getByText('Edit issue');
    expect(editModal).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(editModal).not.toBeInTheDocument();
  });

  test('should open the remove modal when clicking the remove button and close it', async () => {
    renderIssueRow();

    const removeButton = screen.getByText('🗑️');

    await user.click(removeButton);

    const removeModal = screen.getByText(`Remove issue "${mockIssue.title}"?`);
    expect(removeModal).toBeInTheDocument();

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(removeModal).not.toBeInTheDocument();
  });
});
