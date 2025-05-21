import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchReposSuccess,
    fetchReposFailure,
} from './actions'
import { FETCH_REPOS, RepoState, FetchReposAction } from './types';

export function fetchFromGitHub(query: string, page: number, sort: string) {
    return axios.get(`https://api.github.com/search/repositories`, {
        params: {
            q: query,
            sort: 'stars',
            order: sort,
            page,
            per_page: 20,
        },
    });
}

export function* fetchReposSaga(action: FetchReposAction): Generator<any, void, any> {
    try {
        const state = yield select((state: any) => state.repo);
        const res = yield call(fetchFromGitHub, state.query, action.payload.page, state.sortOrder);
        const items = res.data.items;
        const hasMore = items.length === 20;
        yield put(fetchReposSuccess(items, hasMore));
    } catch (error: any) {
        yield put(fetchReposFailure(error.message));
    }
}

export default function* repoSaga() {
    yield takeLatest(FETCH_REPOS, fetchReposSaga);
}