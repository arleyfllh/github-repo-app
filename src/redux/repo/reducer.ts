import { AnyAction } from "redux-saga";
import {
    RepoState,
    FETCH_REPOS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_SUCCESS,
    SET_QUERY,
    SET_SORT_ORDER,
    RepoAction,
} from "./types";

export const initialState: RepoState = {
    data: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    query: "react",
    sortOrder: "desc",
};

export default function repoReducer(
    state = initialState,
    action: RepoAction | AnyAction
): RepoState {
    switch (action.type) {
        case FETCH_REPOS:
            return { ...state, loading: true };
        case FETCH_REPOS_SUCCESS:
            return {
                ...state,
                loading: false,
                data:
                    state.page === 1
                        ? action.payload.data
                        : [...state.data, ...action.payload.data],
                page: state.page + 1,
                hasMore: action.payload.hasMore,
            };
        case FETCH_REPOS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case SET_QUERY:
            return { ...state, query: action.payload, page: 1, data: [] };
        case SET_SORT_ORDER:
            return { ...state, sortOrder: action.payload, page: 1, data: [] };
        default:
            return state;
    }
}
