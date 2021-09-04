import request from "@/utils/request";

export function getGroupLogs(pragmas) {
  return request('/api/groups/get_group_logs', {
    method: 'POST',
    body: JSON.stringify(pragmas)
  })
}
