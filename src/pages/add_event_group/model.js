import * as EventsServices from './services'

export default {
  namespace: 'add_event_group',
  state: {
    events: [],
    tableSelectionData: []
  },
  reducers: {
    setData(state, {payload: {events}}) {
      return {...state, events};
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
      if (res && res.status === 'success') {
        yield put({type: 'setData', payload: {events: res.data}})
      } else {
        yield put({type: 'setData', payload: {events: []}})
      }
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
