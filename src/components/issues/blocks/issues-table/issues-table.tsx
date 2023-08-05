import { IssueItemFragment } from '@gql/graphql';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { FC, useMemo } from 'react';
import { tableColumns } from './issues-table.fixtures';
import './issues-table.css';
import { useIssuesState } from '../../issues.state';

interface IssuesTableContentProps {
  isLoading: boolean;
  issues: IssueItemFragment[];
}

export const IssuesTable: FC<IssuesTableContentProps> = ({ issues }) => {
  const { sortingState, setSortingState } = useIssuesState();

  const columns = useMemo(() => tableColumns, []);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data: issues,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortingState,
    },
    onSortingChange: (getNewSort) => {
      if (typeof getNewSort === 'function') {
        const newSort = getNewSort(sortingState);

        setSortingState(newSort);
      } else {
        setSortingState(getNewSort);
      }
    },
  });
  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();

  return (
    <div className="issues-table">
      <table>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  className={
                    header.column.getCanSort() ? 'can-sort' : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            return (
              <tr>
                {row.getAllCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
