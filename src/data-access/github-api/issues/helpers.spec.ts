import { test, describe, expect } from 'vitest';
import { getQueryVariables } from './helpers'; // Replace 'your-file' with the actual file path
import { UseGetIssuesParams } from './interfaces';
import {
  GetIssuesQueryVariables,
  IssueOrderField,
  OrderDirection,
} from '@gql/graphql';

describe('getQueryVariables', () => {
  test('should return correct query variables with pagination cursor and direction', () => {
    const params: UseGetIssuesParams = {
      paginationCursor: 'abc123',
      paginationDirection: 'after',
    };

    const result = getQueryVariables(params);

    const expected: GetIssuesQueryVariables = {
      orderByValues: null,
      afterCursor: 'abc123',
      beforeCursor: null,
      firstValue: 25,
      lastValue: null,
    };

    expect(result).toEqual(expected);
  });

  test('should return correct query variables with sort direction and field', () => {
    const params: UseGetIssuesParams = {
      sortDirection: OrderDirection.Asc,
      sortField: IssueOrderField.CreatedAt,
    };

    const result = getQueryVariables(params);

    const expected: GetIssuesQueryVariables = {
      orderByValues: {
        direction: OrderDirection.Asc,
        field: IssueOrderField.CreatedAt,
      },
      afterCursor: null,
      beforeCursor: null,
      firstValue: 25,
      lastValue: null,
    };

    expect(result).toEqual(expected);
  });

  test('should return correct query variables with both pagination and sort options', () => {
    const params: UseGetIssuesParams = {
      paginationCursor: 'abc123',
      paginationDirection: 'after',
      sortDirection: OrderDirection.Desc,
      sortField: IssueOrderField.CreatedAt,
    };

    const result = getQueryVariables(params);

    const expected: GetIssuesQueryVariables = {
      orderByValues: {
        direction: OrderDirection.Desc,
        field: IssueOrderField.CreatedAt,
      },
      afterCursor: 'abc123',
      beforeCursor: null,
      firstValue: 25,
      lastValue: null,
    };

    expect(result).toEqual(expected);
  });

  test('should return default query variables when no options provided', () => {
    const result = getQueryVariables({});

    const expected: GetIssuesQueryVariables = {
      orderByValues: null,
      afterCursor: null,
      beforeCursor: null,
      firstValue: 25,
      lastValue: null,
    };

    expect(result).toEqual(expected);
  });
});
