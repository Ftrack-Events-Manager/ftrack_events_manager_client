import * as eventsServices from "@/pages/services";

export default {
  namespace: 'index',
  state: {
    events: []
  },
  reducers: {
    setData(state, {payload: {events}}) {
      return {events}
    }
  },
  effects: {
    * fetch({_}, {call, put, select}) {
      const res = yield call(eventsServices.fetch)
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {events: res.data}})
      } else {
        yield put({type: 'setData', events: []})
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch({type: "fetch"})
        }
      })
    }
  }
}
