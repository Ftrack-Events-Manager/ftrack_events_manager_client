import * as EventsServices from './services'

export default {
  namespace: 'add_event_group',
  state: {
    events: [],
    tableSelectionData: []
  },
  reducers: {
    setData(state, {payload: {events, tableSelectionData}}) {
      return {...state, events, tableSelectionData};
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
    tableSelectionData(state, {tableSelectionData}) {
      return {...state, tableSelectionData}
    }
  },
  effects: {
    * fetch({_}, {call, put, select}) {
      const res = yield call(EventsServices.fetch)
      // todo 编辑时要考虑tableSelectionData值为组内的events
      if (res && res.status === 'success') {
        yield put({
          type: 'setData',
          payload: {events: res.data, tableSelectionData: []}
        })
      } else {
        yield put({type: 'setData', payload: {events: []}})
      }
    },
    * update({name}, {call, select}) {
      const tableSelectionData = yield select(
        state => state.add_event_group.tableSelectionData
      )
      yield call(EventsServices.update, {
        name,
        events: tableSelectionData
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/add_event_group') {
          dispatch({type: 'fetch'})
        }
      });
    }
  }
}
