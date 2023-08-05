import { IssueItemFragment } from '@gql/graphql';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IssueItemFragment>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableColumns: ColumnDef<IssueItemFragment, any>[] = [
  columnHelper.accessor('title', {
    header: 'Title',
    enableSorting: false,
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
  columnHelper.accessor('author', {
    header: 'Author',
    enableSorting: false,
    cell: ({ getValue }) => {
      const author = getValue();
      if (author) {
        return <span>{author.login}</span>;
      }

      return null;
    },
  }),
  columnHelper.accessor('state', {
    header: 'State',
    enableSorting: false,
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created at',
    enableSorting: true,
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
];
