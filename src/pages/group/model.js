import * as groupServices from './services'
import * as groupsServices from '../services'

const initState = {
  name: '',
  events: [],
  tableSelectionData: [],
  selectedRowKeys: [],
  modalVisible: false,
  modalLoading: false,
  groupNames: [],
}


export default {
  namespace: 'group',
  state: initState,
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload};
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
    },
  },
  effects: {
    * fetch({_}, {call, put, select}) {
      yield put({
        type: 'setData',
        payload: initState
      })

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
    * update({name, id}, {call, select}) {
      const tableSelectionData = yield select(
        state => state.group.tableSelectionData
      )
      yield call(groupServices.update, {
        name, events: tableSelectionData, id
      })
    },
    * fetchInfo({id}, {call, put}) {
      yield put({
        type: 'setData',
        payload: initState
      })
      const res = yield call(groupServices.fetchInfo, {id})
      if (res && res.status === 'success') {
        const eventsRes = yield call(groupServices.fetch)
        yield put({
          type: 'setData',
          payload: {
            name: res.data['name'],
            events: [...res.data['events'], ...eventsRes.data],
            tableSelectionData: res.data['events'],
            selectedRowKeys: res.data['events'].map(v => v['id']),
          }
        })
      }
    },
    * getGroupNames({_}, {call, put}) {
      const res = yield call(groupsServices.fetch)
      if (res && res.status === 'success') {
        yield put({
          'type': 'setData',
          payload: {groupNames: res.data.map(e => e.name)}
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
