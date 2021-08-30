import request from "@/utils/request";

export function fetch() {
  return request('/api/groups/get_groups')
}

export function stopGroup(id) {
  return request('/api/operate/stop_group', {
    method: 'POST',
    body: JSON.stringify({id})
  })
}

export function deleteGroup(id) {
  return request('/api/groups/delete_group', {
    method: 'POST',
    body: JSON.stringify({id})
  })
}
