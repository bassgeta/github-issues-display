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
import { IssueOrderField, OrderDirection } from '@gql/graphql';

const ORDER_FIELD_MAP: Record<string, IssueOrderField> = {
  createdAt: IssueOrderField.CreatedAt,
};

export const Issues: FC = () => {
  const { sortingState } = useIssuesState();
  const sortParams: UseGetIssuesParams = useMemo(() => {
    const activeSort = sortingState[0];

    if (activeSort === undefined) {
      return {};
    }

    const issueOrderField = ORDER_FIELD_MAP[activeSort.id];

    if (!issueOrderField) {
      console.warn(
        `No IssueOrderField provided for sortable field ${activeSort.id}`,
      );
      return {};
    }

    return {
      sortDirection: activeSort.desc ? OrderDirection.Desc : OrderDirection.Asc,
      sortField: issueOrderField,
    };
  }, [sortingState]);

  const getIssuesQuery = useGetIssues(sortParams);

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
