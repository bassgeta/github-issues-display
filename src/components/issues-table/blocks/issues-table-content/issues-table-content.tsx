import { IssueItemFragment } from '@gql/graphql';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table';
import { FC, useMemo } from 'react';
import { tableColumns } from './issues-table-content.fixtures';
import './issues-table-content.css';

interface IssuesTableContentProps {
  isLoading: boolean;
  issues: IssueItemFragment[];
}

export const IssueTableContent: FC<IssuesTableContentProps> = ({ issues }) => {
  const columns = useMemo(() => tableColumns, []);
  const { getRowModel, getHeaderGroups } = useReactTable({
    columns,
    data: issues,
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();

  return (
    <div className="issues-table-content">
      <table>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr>
              {headerGroup.headers.map((column) =>
                column.id.includes('hidden') ? null : (
                  <th>
                    {flexRender(
                      column.column.columnDef.header,
                      column.getContext(),
                    )}
                  </th>
                ),
              )}
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
