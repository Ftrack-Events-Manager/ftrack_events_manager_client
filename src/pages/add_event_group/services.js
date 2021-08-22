import request from "@/utils/request";

export function fetch() {
  return request('/api/events/get_not_used_events')
}
