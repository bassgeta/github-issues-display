import {
  useGetIssues,
  UseGetIssuesParams,
} from '@data-access/github-api/issues';
import { Loader } from '@design-system/loader/loader';
import { FC, useMemo } from 'react';
import { Button } from '@design-system/button/button';
import { IssuesTable } from './blocks/issues-table/issues-table';
import './issues.css';
import { useIssuesState } from './issues.state';

export const Issues: FC = () => {
  const { sortingParams, paginationParams, setPaginationParams } =
    useIssuesState();
  const getIssuesParams: UseGetIssuesParams = useMemo(() => {
    return {
      ...(sortingParams ?? {}),
      ...(paginationParams ?? {}),
    };
  }, [sortingParams, paginationParams]);

  const getIssuesQuery = useGetIssues(getIssuesParams);

  function getContent() {
    if (getIssuesQuery.isError) {
      return (
        <div className="error-container">
          <span className="error-text">Something went wrong :(</span>
          <Button
            className="refetch-btn"
            variant="secondary"
            onClick={getIssuesQuery.refetch}
          >
            Try again?
          </Button>
        </div>
      );
    }

    if (getIssuesQuery.isLoading && getIssuesQuery.data === null) {
      return <Loader />;
    }

    if (getIssuesQuery.data) {
      const { issues, paginationInfo } = getIssuesQuery.data;
      return (
        <>
          <div>
            <button
              disabled={!paginationInfo.hasPreviousPage}
              onClick={() => {
                if (paginationInfo.startCursor) {
                  setPaginationParams({
                    paginationDirection: 'before',
                    paginationCursor: paginationInfo.startCursor,
                  });
                }
              }}
            >
              Prev
            </button>
            <button
              disabled={!paginationInfo.hasNextPage}
              onClick={() => {
                if (paginationInfo.endCursor) {
                  setPaginationParams({
                    paginationDirection: 'after',
                    paginationCursor: paginationInfo.endCursor,
                  });
                }
              }}
            >
              Next
            </button>
          </div>
          <IssuesTable isLoading={getIssuesQuery.isLoading} issues={issues} />
        </>
      );
    }

    return null;
  }

  return <div className="issues">{getContent()}</div>;
};
