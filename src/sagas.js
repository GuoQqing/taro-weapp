/**
 * sagas.js
 */
import { effects } from './redux-saga/dist/redux-saga';

const { put, takeEvery, call, all } = effects;

function* getLocation(action) {
    // const result = yield call(addSaga, action.payload);
    const payload = action.payload;
    yield put({ type: 'SET_LOCATION', action: payload });
}

// 保存当前位置
function* watchGetLocation() {
    yield takeEvery("SET_LOCATION_WATCH", getLocation)
}

export default function* rootSaga() {
    yield all([
      watchGetLocation(),
    ]);
}