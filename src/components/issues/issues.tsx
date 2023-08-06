import { useGetIssues } from '@data-access/github-api/issues';
import { Loader } from '@design-system/loader/loader';
import { FC, useMemo } from 'react';
import { Button } from '@design-system/button/button';
import { IssuesTable } from './blocks/issues-table/issues-table';
import './issues.css';
import { useIssuesState } from './issues.state';
import { Pagination } from './blocks/pagination/pagination';
import { getIssuesParams } from './helpers';

export const Issues: FC = () => {
  const { sortingParams, paginationParams } = useIssuesState();
  const getIssuesQueryParams = useMemo(
    () => getIssuesParams(sortingParams, paginationParams),
    [sortingParams, paginationParams],
  );

  const getIssuesQuery = useGetIssues(getIssuesQueryParams);

  function getContent() {
    if (getIssuesQuery.isError) {
      return (
        <div className="error-container">
          <span className="error-text">Something went wrong :(</span>
          <Button
            className="refetch-btn"
            variant="secondary"
            onClick={async () => {
              await getIssuesQuery.refetch();
            }}
          >
            Try again?
          </Button>
        </div>
      );
    }

    if (getIssuesQuery.isFetching && getIssuesQuery.data === null) {
      return <Loader />;
    }

    if (getIssuesQuery.data) {
      const { issues, paginationInfo } = getIssuesQuery.data;

      return (
        <>
          <Pagination {...paginationInfo} />
          <IssuesTable issues={issues} />
          {getIssuesQuery.isFetching && (
            <div className="loader-container">
              <Loader size={64} />{' '}
            </div>
          )}
        </>
      );
    }

    return null;
  }

  return <div className="issues">{getContent()}</div>;
};
