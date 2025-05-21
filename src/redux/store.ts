import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./repo/reducer";
import repoSaga from "./repo/saga";
import { all } from "redux-saga/effects";

const createSagaMiddleware = require("redux-saga").default;

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        repo: repoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

function* rootSaga() {
    yield all([repoSaga()]);
}

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
