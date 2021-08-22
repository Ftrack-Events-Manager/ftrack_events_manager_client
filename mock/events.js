export default {
  'GET /api/events/get_events': {
    status: 'success',
    msg: 'request successful',
    data: [
      {
        id: 1,
        group: '事件组1',
        status: 'run',
        run_events: 6,
        error_num: 30
      },
      {
        id: 2,
        group: '事件组2',
        status: 'stop',
        run_events: 12,
        error_num: 66
      },
      {
        id: 3,
        group: '事件组1',
        status: 'run',
        run_events: 3,
        error_num: 0
      },
    ]
  },
  'GET /api/events/get_not_used_events': {
    status: 'success',
    msg: 'request successful',
    data: [
      {
        id: 1,
        event: '事件1',
        priority: 50,
        enabled: true
      },
      {
        id: 2,
        event: '事件2',
        priority: 100,
        enabled: false
      },
      {
        id: 3,
        event: '事件3',
        priority: 100,
        enabled: true
      }
    ]
  }
}
