import repoReducer, { initialState } from "../../../src/redux/repo/reducer";
import {
    fetchRepos,
    fetchReposSuccess,
    fetchReposFailure,
    setQuery,
    setSortOrder,
} from "../../../src/redux/repo/actions";

describe("repoReducer", () => {
    it("should return the initial state", () => {
        expect(repoReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should handle fetchRepos", () => {
        const nextState = repoReducer(initialState, fetchRepos());
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBe(null);
    });

    it("should handle fetchReposSuccess", () => {
        const repos = { data: [], hasMore: true };
        const nextState = repoReducer(
            initialState,
            fetchReposSuccess(repos.data, repos.hasMore)
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe(null);
        expect(nextState.hasMore).toBe(true);
    });

    it("should handle fetchReposFailure", () => {
        const nextState = repoReducer(initialState, fetchReposFailure("Error"));
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error");
    });

    it("should handle setQuery", () => {
        const nextState = repoReducer(initialState, setQuery("react"));
        expect(nextState.query).toBe("react");
        expect(nextState.page).toBe(1);
        expect(nextState.data).toEqual([]);
    });

    it("should handle setSortOrder", () => {
        const nextState = repoReducer(initialState, setSortOrder("asc"));
        expect(nextState.sortOrder).toBe("asc");
        expect(nextState.page).toBe(1);
        expect(nextState.data).toEqual([]);
    });
});
