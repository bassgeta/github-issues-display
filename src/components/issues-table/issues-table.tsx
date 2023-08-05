import { useGetIssues } from '@data-access/github-api/issues/use-get-issues';
import { Loader } from '@design-system/loader/loader';
import { FC } from 'react';

export const IssuesTable: FC = () => {
  const getIssuesQuery = useGetIssues();

  function getContent() {
    if (getIssuesQuery.isError) {
      return (
        <div className="error-container">
          <span className="error-text">Something went wrong :(</span>
          <button className="refetch-btn" onClick={getIssuesQuery.refetch}>
            Try again?
          </button>
        </div>
      );
    }

    if (getIssuesQuery.isLoading) {
      return <Loader />;
    }

    if (getIssuesQuery.data) {
      return (
        <div>
          {getIssuesQuery.data.map((issue) => {
            return <span key={issue.id}>{issue.title}</span>;
          })}
        </div>
      );
    }

    return null;
  }

  return <div className="issues-table">{getContent()}</div>;
};
