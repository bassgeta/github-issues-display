import { GetIssuesQueryVariables } from '@gql/graphql';
import { UseGetIssuesParams } from './interfaces';

const PAGE_SIZE = 25;
export function getQueryVariables({
  paginationCursor,
  paginationDirection,
  sortDirection,
  sortField,
}: UseGetIssuesParams): GetIssuesQueryVariables {
  let queryVariables: GetIssuesQueryVariables = {
    orderByValues: null,
    afterCursor: null,
    beforeCursor: null,
    firstValue: PAGE_SIZE,
    lastValue: null,
  };

  if (paginationCursor && paginationDirection) {
    const paginationVariables =
      paginationDirection === 'after'
        ? {
            afterCursor: paginationCursor,
            beforeCursor: null,
            firstValue: PAGE_SIZE,
            lastValue: null,
          }
        : {
            afterCursor: null,
            beforeCursor: paginationCursor,
            firstValue: null,
            lastValue: PAGE_SIZE,
          };
    queryVariables = {
      ...queryVariables,
      ...paginationVariables,
    };
  }

  if (sortDirection && sortField) {
    queryVariables = {
      ...queryVariables,
      orderByValues: {
        direction: sortDirection,
        field: sortField,
      },
    };
  }

  return queryVariables;
}
