import { all, fork, takeLatest } from "redux-saga/effects";
import { mintNFTHandler } from "../handlers/app";
import { minting } from "../reducers/app";

export function* mintNFTSaga() {
  yield takeLatest(minting.type, mintNFTHandler);
}

export default function* RootSaga() {
  yield all([
    fork(mintNFTSaga)
  ]);
}
