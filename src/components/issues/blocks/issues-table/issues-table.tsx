import {
  IssueItemFragment,
  IssueOrderField,
  OrderDirection,
} from '@gql/graphql';
import { FC } from 'react';
import './issues-table.css';
import { useIssuesState } from '../../issues.state';
import { IssueRow } from '../issue-row/issue-row';

interface IssuesTableContentProps {
  issues: IssueItemFragment[];
}

export const IssuesTable: FC<IssuesTableContentProps> = ({ issues }) => {
  const { sortingParams, setSortingParams } = useIssuesState();

  function handleOnSortClick(field: IssueOrderField): void {
    // If sorting anew or for the first time
    if (sortingParams === null || field !== sortingParams.sortField) {
      setSortingParams({ sortField: field, sortDirection: OrderDirection.Asc });
      return;
    }

    if (sortingParams.sortDirection === OrderDirection.Asc) {
      setSortingParams({
        sortField: field,
        sortDirection: OrderDirection.Desc,
      });
      return;
    }

    if (sortingParams.sortDirection === OrderDirection.Desc) {
      setSortingParams(null);
      return;
    }
  }

  function getSortingAdornment(field: IssueOrderField) {
    if (sortingParams === null || field !== sortingParams.sortField) {
      return null;
    }

    return sortingParams.sortDirection === OrderDirection.Asc ? '🔼' : '🔽';
  }

  return (
    <div className="issues-table">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>State</th>
            <th
              className="can-sort"
              onClick={() => {
                handleOnSortClick(IssueOrderField.CreatedAt);
              }}
            >
              Created at {getSortingAdornment(IssueOrderField.CreatedAt)}
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
