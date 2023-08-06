import {
  UseGetIssuesParams,
  useGetIssues,
} from '@data-access/github-api/issues/use-get-issues';
import { Loader } from '@design-system/loader/loader';
import { FC, useMemo } from 'react';
import { Button } from '@design-system/button/button';
import { IssuesTable } from './blocks/issues-table/issues-table';
import './issues.css';
import { useIssuesState } from './issues.state';

export const Issues: FC = () => {
  const { sortingParams } = useIssuesState();
  const getIssuesParams: UseGetIssuesParams = useMemo(() => {
    return sortingParams ?? {};
  }, [sortingParams]);

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

    if (getIssuesQuery.isLoading && getIssuesQuery.data.length === 0) {
      return <Loader />;
    }

    if (getIssuesQuery.data) {
      return (
        <IssuesTable
          isLoading={getIssuesQuery.isLoading}
          issues={getIssuesQuery.data}
        />
      );
    }

    return null;
  }

  return <div className="issues">{getContent()}</div>;
};
