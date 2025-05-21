export interface RepoItem {
    id: number;
    name: string;
    full_name: string;
    owner: {
        login: string;
        avatar_url: string;
    };
    description: string;
}

export interface RepoState {
    data: RepoItem[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    query: string;
    sortOrder: "asc" | "desc";
}

export const FETCH_REPOS = "FETCH_REPOS";
export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";
export const SET_QUERY = "SET_QUERY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export interface FetchReposPayload {
  page: number;
}

export interface FetchReposAction {
  type: typeof FETCH_REPOS;
  payload: FetchReposPayload;
}

export interface FetchReposSuccessAction {
  type: typeof FETCH_REPOS_SUCCESS;
  payload: {
    data: RepoItem[];
    hasMore: boolean;
  };
}

export interface FetchReposFailureAction {
  type: typeof FETCH_REPOS_FAILURE;
  payload: string;
}

export interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: string;
}

export interface SetSortOrderAction {
  type: typeof SET_SORT_ORDER;
  payload: "asc" | "desc";
}

export type RepoAction =
  | FetchReposAction
  | FetchReposSuccessAction
  | FetchReposFailureAction
  | SetQueryAction
  | SetSortOrderAction;