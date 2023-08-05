import { IssueItemFragment } from '@gql/graphql';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IssueItemFragment>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableColumns: ColumnDef<IssueItemFragment, any>[] = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
  columnHelper.accessor('author', {
    header: 'Author',
    cell: ({ getValue }) => {
      const author = getValue();
      console.log('ma autor', author);
      if (author) {
        return <span>{author.login}</span>;
      }

      return null;
    },
  }),
  columnHelper.accessor('state', {
    header: 'State',
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
  columnHelper.accessor('createdAt', {
    header: 'Status',
    cell: ({ getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
];
