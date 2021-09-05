import {router} from "umi";

import * as groupServices from '../group/services'
import * as detailServices from './services'

export default {
  namespace: 'detail',
  state: {
    runEventsCount: 0,
    stopEventsCount: 0,
    warningLogCount: 0,
    errorLogCount: 0,
    onlyShowError: false,
    logDate: '',
    logs: []
  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  },
  effects: {
    * initData({id}, {put}) {
      const today = new Date()
      const month = today.getMonth() + 1 > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
      const logDate = `${today.getFullYear()}/${month}/${day}`
      yield put({
        type: 'setData',
        payload: {
          onlyShowError: false,
          logs: [],
          logDate
        }
      })
      yield put({type: 'getGroupInfo', id})
      yield put({type: 'getGroupLogs', id})
    },
    * getGroupInfo({id}, {call, put}) {
      const res = yield call(groupServices.fetchInfo, {id})
      if (res && res.status === 'success') {
        const runEventsCount = res.data.events.filter(e => e.enabled === true).length
        const stopEventsCount = res.data.events.filter(e => e.enabled === false).length
        yield put({type: 'setData', payload: {runEventsCount, stopEventsCount}})
      }
    },
    * getGroupLogs({id}, {call, put, select}) {
      const logDate = yield select(state => state.detail.logDate)
      const onlyShowError = yield select(state => state.detail.onlyShowError)
      const res = yield call(detailServices.getGroupLogs, {
        id, logDate, onlyShowError
      })
      if (res && res.status === 'success') {
        const oldLogs = select(state => state.detail.logs)
        const {logs, errorLogCount, warningLogCount} = res.data
        if (oldLogs !== logs) {
          yield put({
            type: 'setData',
            payload: {logs, errorLogCount, warningLogCount}
          })
        }
      }
    },

    * handleChanged({id, payload}, {call, put}) {
      yield put({type: 'setData', payload: {...payload}})
      yield put({type: 'getGroupLogs', id})
    }
  },
  subscriptions: {
    setup({history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/detail') {
          router.push('/')
        }
      })
    }
  }
}
