import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "app/store/sagas/rootsaga";
import app from "./reducers/app";
import { RootState } from "./types";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  app
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
