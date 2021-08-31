import * as groupServices from './services'

export default {
  namespace: 'group',
  state: {
    name: '',
    events: [],
    tableSelectionData: [],
    selectedRowKeys: []
  },
  reducers: {
    setData(state, {payload: {name, events, tableSelectionData, selectedRowKeys}}) {
      return {...state, name, events, tableSelectionData, selectedRowKeys};
    },
    updateEnabled(state, {id, isChecked}) {
      let events = state.events
      events.map(event => {
        if (event.id === id) {
          event.enabled = isChecked
        }
        return event
      })
      return {...state, events}
    },
    updatePriority(state, {id, priority}) {
      let events = state.events
      events.map(event => {
        if (event.id === id) {
          event.priority = priority
        }
        return event
      })
      return {...state, events}
    },
    tableSelectionData(state, {tableSelectionData, selectedRowKeys}) {
      return {...state, tableSelectionData, selectedRowKeys}
    }
  },
  effects: {
    * fetch({_}, {call, put, select}) {
      const res = yield call(groupServices.fetch)
      if (res && res.status === 'success') {
        yield put({
          type: 'setData',
          payload: {events: res.data}
        })
      } else {
        yield put({type: 'setData', payload: {events: []}})
      }
    },
    * update({name}, {call, select}) {
      // todo 编辑更新
      const tableSelectionData = yield select(
        state => state.group.tableSelectionData
      )
      yield call(groupServices.update, {
        name,
        events: tableSelectionData
      })
    },
    * fetchInfo({id}, {call, put}) {
      const res = yield call(groupServices.fetchInfo, {id})
      if (res && res.status === 'success') {
        const eventsRes = yield call(groupServices.fetch)
        yield put({
          type: 'setData',
          payload: {
            name: res.data['name'],
            events: [...res.data['events'], ...eventsRes.data],
            tableSelectionData: res.data['events'],
            selectedRowKeys: res.data['events'].map(v => v['id'])
          }
        })
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/group') {
          dispatch({type: 'fetch'})
        }
      });
    }
  }
}