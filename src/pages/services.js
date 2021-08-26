import request from "@/utils/request";

export function fetch() {
  return request('/api/groups/get_groups')
}
