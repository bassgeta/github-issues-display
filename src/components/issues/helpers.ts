import { UseGetIssuesParams } from '@data-access/github-api/issues';
import { PaginationParams, SortingParams } from './issues.state';

export function getIssuesParams(
  sortingParams: SortingParams | null,
  paginationParams: PaginationParams | null,
): UseGetIssuesParams {
  return {
    ...(sortingParams ?? {}),
    ...(paginationParams ?? {}),
  };
}
