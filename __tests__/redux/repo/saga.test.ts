import axios, { AxiosHeaders, AxiosResponse } from "axios";
import repoSaga, * as saga from "../../../src/redux/repo/saga";
import { FETCH_REPOS, FetchReposAction, RepoItem } from "../../../src/redux/repo/types";
import { fetchReposFailure, fetchReposSuccess } from "../../../src/redux/repo/actions";
import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchReposSaga", () => {
    const dispatched: any[] = [];

    const mockState = {
        repo: {
            query: "react",
            sortOrder: "desc",
        },
    };

    const mockAction: FetchReposAction = {
        type: "FETCH_REPOS",
        payload: { page: 1 },
    };

    beforeEach(() => {
        dispatched.length = 0;
        jest.restoreAllMocks();
    });

    it("should dispatch fetchReposSuccess on API success", async () => {
        const mockItems = [
            {
                id: 1,
                name: "repo-test",
                full_name: "repo-test-full",
                owner: {
                    login: "testing",
                    avatar_url: "http",
                },
                description: "desc",
            },
        ];
        const mockResponse: AxiosResponse = {
            data: {
                items: mockItems,
            },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {
                headers: new AxiosHeaders(),
            },
        };

        // jest.spyOn(saga, "fetchFromGitHub").mockResolvedValueOnce(mockResponse);
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => mockState,
            },
            saga.fetchReposSaga,
            mockAction
        ).toPromise();

        expect(dispatched).toContainEqual(fetchReposSuccess(mockItems, false));
    });

    it("should dispatch fetchReposFailure on API failure", async () => {
        const error = "API Error";
        // jest.spyOn(saga, "fetchFromGitHub").mockImplementationOnce(() => Promise.reject(new Error(error)));
        mockedAxios.get.mockRejectedValueOnce(new Error(error));

        await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
                getState: () => mockState,
            },
            saga.fetchReposSaga,
            mockAction,
        ).toPromise();

        expect(dispatched).toContainEqual(fetchReposFailure(error));
    })
});

describe('repoSaga watcher', () => {
  it('should wait for FETCH_REPOS and call fetchReposSaga', () => {
    const generator = repoSaga();

    const next = generator.next();
    expect(next.value).toEqual(takeLatest(FETCH_REPOS, saga.fetchReposSaga));

    const done = generator.next();
    expect(done.done).toBe(true);
  });
});