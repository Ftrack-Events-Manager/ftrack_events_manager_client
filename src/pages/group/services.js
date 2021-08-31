import request from "@/utils/request";

export function fetch() {
  return request('/api/events/get_not_used_events')
}

export function update(pragmas) {
  return request('/api/groups/add_group', {
    method: 'POST',
    body: JSON.stringify(pragmas)
  })
}

export function fetchInfo(pragmas) {
  return request('/api/groups/get_group_info', {
    method: 'POST',
    body: JSON.stringify(pragmas)
  })
}
