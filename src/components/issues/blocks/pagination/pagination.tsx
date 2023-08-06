import { PageInfo } from '@gql/graphql';
import { FC } from 'react';
import './pagination.css';
import { useIssuesState } from '../../issues.state';
import { Button } from '@design-system/button/button';

type PaginationProps = PageInfo;

export const Pagination: FC<PaginationProps> = ({
  endCursor,
  hasNextPage,
  hasPreviousPage,
  startCursor,
}) => {
  const { setPaginationParams } = useIssuesState();

  return (
    <div className="pagination">
      <Button
        disabled={!hasPreviousPage}
        onClick={() => {
          if (startCursor) {
            setPaginationParams({
              paginationDirection: 'before',
              paginationCursor: startCursor,
            });
          }
        }}
      >
        ⬅️
      </Button>
      <Button
        disabled={!hasNextPage}
        onClick={() => {
          if (endCursor) {
            setPaginationParams({
              paginationDirection: 'after',
              paginationCursor: endCursor,
            });
          }
        }}
      >
        ➡️
      </Button>
    </div>
  );
};
