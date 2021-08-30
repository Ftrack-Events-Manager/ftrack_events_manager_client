import * as groupsServices from "@/pages/services";

export default {
  namespace: 'index',
  state: {
    groups: []
  },
  reducers: {
    setData(state, {payload: {groups}}) {
      return {groups}
    }
  },
  effects: {
    * fetch({_}, {call, put}) {
      const res = yield call(groupsServices.fetch)
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {groups: res.data}})
      } else {
        yield put({type: 'setData', payload: {groups: []}})
      }
    },
    * deleteGroup({group}, {call, put}) {
      if (group['status'] === 'run') {
        yield call(groupsServices.stopGroup, group['id'])
      }
      const res = yield call(groupsServices.deleteGroup, group['id'])
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {groups: res.data}})
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
