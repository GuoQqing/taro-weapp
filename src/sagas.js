/**
 * sagas.js
 */
import { effects } from './redux-saga/dist/redux-saga';
import { ADD, MINUS } from './constants/counter';
import { addSaga } from './servers/servers';

const { put, takeEvery, call, all } = effects;

function* add_saga(action) {
    const result = yield call(addSaga, action.payload);
    yield put({ type: ADD, result });
}
function* minus_saga(action) {
    const result = yield call(addSaga, action.payload);
    yield put({ type: MINUS, result });
}

function* watch_add() {
    yield takeEvery("ADD_SAGA", add_saga)
}
function* watch_minus() {
    yield takeEvery("MINUS_SAGA", minus_saga)
}

export default function* rootSaga() {
    yield all([
        watch_add(),
        watch_minus(),
    ]);
}