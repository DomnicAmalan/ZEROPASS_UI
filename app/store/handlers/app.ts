import { call, put } from "redux-saga/effects";
import {
  mintingFailed,
  mintingSuccess,
  setPayload
} from '@/app/store/reducers/app'
import { MintNft } from "@/app/api/links";

export function* mintNFTHandler(action: any) {
  try {
    const data: ReturnType<typeof MintNft> = yield call(MintNft, action.payload);
    yield put(mintingSuccess(data));
  } catch (e: any) {
    yield put(mintingFailed({ property: action?.payload?.property }));
    // yield put(getRiskAllDataFailed(true));
  }
}