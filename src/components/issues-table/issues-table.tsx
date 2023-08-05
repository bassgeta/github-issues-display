import { useGetIssues } from '@data-access/github-api/issues/use-get-issues';
import { Loader } from '@design-system/loader/loader';
import { FC } from 'react';
import './issues-table.css';
import { Button } from '@design-system/button/button';
import { IssueTableContent } from './blocks/issues-table-content/issues-table-content';

export const IssuesTable: FC = () => {
  const getIssuesQuery = useGetIssues();

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
        <IssueTableContent
          isLoading={getIssuesQuery.isLoading}
          issues={getIssuesQuery.data}
        />
      );
    }

    return null;
  }

  return <div className="issues-table">{getContent()}</div>;
};
