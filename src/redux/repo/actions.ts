import {
    FETCH_REPOS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_SUCCESS,
    SET_QUERY,
    SET_SORT_ORDER,
    RepoItem,
    FetchReposAction,
    FetchReposSuccessAction,
    FetchReposFailureAction,
    SetQueryAction,
    SetSortOrderAction,
} from "./types";

export const fetchRepos = (page = 1): FetchReposAction => ({
    type: FETCH_REPOS,
    payload: { page },
});

export const fetchReposSuccess = (
    data: RepoItem[],
    hasMore: boolean
): FetchReposSuccessAction => ({
    type: FETCH_REPOS_SUCCESS,
    payload: { data, hasMore },
});

export const fetchReposFailure = (error: string): FetchReposFailureAction => ({
    type: FETCH_REPOS_FAILURE,
    payload: error,
});

export const setQuery = (query: string): SetQueryAction => ({
    type: SET_QUERY,
    payload: query,
});

export const setSortOrder = (order: "asc" | "desc"): SetSortOrderAction => ({
    type: SET_SORT_ORDER,
    payload: order,
});
